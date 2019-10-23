const router =  require('express').Router()
const loteria = require('../util/loteria')
const pool = require('../database')

const util =  new loteria(50,24,6,10,1)

router.get('/ticket_generator',(req,res)=>{ 
    const tickets = util.ticketsSerializer()    
    Object.keys(tickets).map(async(index)=>{      
        await pool.query('INSERT INTO TICKETS set?',[tickets[index]]);        
    })
    res.json({
        tickets
    })
})

router.get('/tickets',async(req,res)=>{    
    const tickets  = await pool.query('SELECT  FROM TICKETS WHERE SELL=FALSE');
    res.json({
        tickets
    })    
 })
 router.get('/tickets/:limit',async(req,res)=>{    
    const id =Number(req.params.limit)
    console.log(id); 
    const tickets  = await pool.query('SELECT * FROM TICKETS WHERE SELL=FALSE  ORDER by RAND() LIMIT ?',[id]);
    res.json({
        tickets
    })
    
 })
router.get('/seller/:IDticket',async(req,res)=>{     
     const id =req.params.IDticket
     const data ={
        ID_USER:1,
        ID_TICKET:id
     }     
     const check  = await pool.query('SELECT SELL FROM TICKETS WHERE ID = ? ',[id]);
     console.log(check[0].SELL);
     if(check[0].SELL=== 0) {
        await pool.query('INSERT INTO TICKETS_SELL set ?',[data])  .then(async res=>{
            await pool.query('UPDATE TICKETS SET SELL=TRUE WHERE  ID =?',[id])
        })
        res.json({
            status:"ready"
        })
    }else{
        res.json('401',{
            status:"sell"
        })
    }
})

router.get('/seller',async(req,res)=>{     
    const tickets  = await pool.query('SELECT ID FROM TICKETS WHERE SELL=TRUE')   
    res.json({   
        tickets     
   })    
})

const tickets_seller=async()=>{    
    const tickets  = await pool.query('SELECT ID FROM TICKETS WHERE SELL=FALSE')    
    const res=parseInt(Math.random() * tickets.length)
    return tickets[res].ID    
}

const tickets_dis=async()=>{    
    const tickets  = await pool.query('SELECT ID FROM TICKETS WHERE SELL=FALSE');             
    return tickets
}

const tickets_sell=async()=>{    
    const tickets  = await pool.query('SELECT ID FROM TICKETS WHERE SELL=TRUE');             
    return tickets[res]
}

module.exports = router
