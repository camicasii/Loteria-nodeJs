const router =  require('express').Router()
const loteria = require('../util/loteria')
const ticketsSerializer = require('../util/utils')
const pool = require('../database')

const util =  new loteria(50,24,6,10,500)

router.get('/ticket_generator',(req,res)=>{ 
    const tickets = util.ticketsSerializer()    
    Object.keys(tickets).map(async(index)=>{      
        await pool.query('INSERT INTO TICKETS set?',[tickets[index]]);        
    })
    return res.json({
        tickets
    })
}),
router.post('/ticket_generator2',async (req,res)=>{  
    
    const totalTicket= req.body.totalTicket
    const asing = req.body.asing
    const selectArray = req.body.selectArray
    const tickets = await ticketsSerializer(totalTicket,asing,selectArray,[])            
    if(tickets == null)
    return res.status(403).json({
            tickets:"erro"
        })
    return res.json({
        tickets
    })
})

router.get('/tickets',async(req,res)=>{    
    const tickets  = await pool.query('SELECT * FROM TICKETS WHERE SELL=FALSE');
    return res.json({
        tickets
    })    
 })
 router.get('/tickets/:limit',async(req,res)=>{    
    const id =Number(req.params.limit)
    console.log(id); 
    const tickets  = await pool.query('SELECT * FROM TICKETS WHERE SELL=FALSE  ORDER by RAND() LIMIT ?',[id]);
    return res.json({
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
     console.log(check);
     if(check.length<1)
     return res.json("403",{
        status:"error id"
    })

     if(check[0].SELL=== 0 ) {
        await pool.query('INSERT INTO TICKETS_SELL set ?',[data])  .then(async res=>{
            await pool.query('UPDATE TICKETS SET SELL=TRUE WHERE  ID =?',[id])
        })
        return res.json({
            status:"ready"
        })
    }else{
        return  res.json('401',{
            status:"sell"
        })
    }
})

router.get('/seller',async(req,res)=>{     
    const tickets  = await pool.query('SELECT ID FROM TICKETS WHERE SELL=TRUE')   
    return res.json({   
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
