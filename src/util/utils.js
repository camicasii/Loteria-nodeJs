
const serial= (serial, totalTicket)=>{            
        let res = serial        
    while(res.length<totalTicket){            
        let num =""    
        for(let i =0; i<9;i++){            
            const numberRandom = parseInt(Math.random()*9)
            num += numberRandom.toString()
        }
        if(!res.includes(num)){
            res.push(num)            
        }
    }
    return res
}
const ticketsSerializer=(totalTicket,asing,selectArray = [],serial_ = [])=>{
    if(asing>selectArray.length)
    return null;
    const tickect =  ticketGenerator(totalTicket,asing,selectArray)
    const cod = serial(serial_, totalTicket)
    let res=[]
    tickect.map((tik,i)=>{
        const data ={
            'TICKET':tik,
            'SERIAL': Number(cod[i]),
            'SELL':false
        }
        res.push(data)
    })
    return res
}
const  ticketHazar=(asing,selectArray)=>{
    let res =[]                
    while(res.length <asing){        
    const numberRandom = parseInt(Math.random()* selectArray.length)
    const val = selectArray[numberRandom]
    if(!res.includes(val)){
        res.push(val)
    }        
}        
return res.join("-")
}
const ticketGenerator=(totalTicket,asing,selectArray)=>{
    let res = []
    while(res.length <totalTicket){                
        const val = ticketHazar(asing,selectArray)                
        if(!res.includes(val)){
            res.push(val)
        }                
        }    
    return res
    }


   let ticketsSerializer2=(totalTicket,asing,selectArray)=>{
       return new Promise((resolve, reject) => {
        const a =ticketsSerializer(totalTicket,asing,selectArray)
        if(a===null)
        resolve(null)
        resolve(a)

})
   }

module.exports = ticketsSerializer2;




