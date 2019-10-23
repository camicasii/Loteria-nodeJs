class Lottery{    
    constructor(maxBall, ballSelect, winnerSing, sell, totalTicket){
        this.maxBall = maxBall
        this.ballSelect = ballSelect
        this.winnerSing = winnerSing
        this.sell = sell
        this.totalTicket = totalTicket                       
        this.ball = this.contadorBolas()
        this.ball_imt_all  = this.ball  
    }        
        ONE = 1
        allWinnerProb = []
        allTicketGenerators = []
        allTicketSeller = []        
    
    run(){
        let x =this.ticketGenerator()
        let y =this.ticketSeller()
        let z =this.ticketHazar()
        this.allTicketGenerators = x
        this.allTicketSeller= y
    }

    ticketSeller= ()=>{
        const tickets = this.ticketGenerator()
        let res = []
        while(res.length < this.sell){        
            const numberRandom = parseInt(Math.random()* tickets.length)        
            const val = tickets[numberRandom]
            if(!res.includes(val)){
                res.push(val)
            }        
        }   
        return res
    }
    
    ticketHazar=()=>{
        let res =[]                
        while(res.length <6){        
        const numberRandom = parseInt(Math.random()* this.ball_imt_all.length)        
        const val = this.ball_imt_all[numberRandom]
        if(!res.includes(val)){
            res.push(val)
        }        
    }        
    return res
}
ticketsSerializer=()=>{
    const tickect =  this.ticketGenerator()
    const cod = this.serial()
    let res=[]
    tickect.map((tik,i)=>{
        const data ={
            'TICKET':tik.join(),
            'SERIAL': Number(cod[i]),
            'SELL':false
        }
        res.push(data)
    })
    return res
}


ticketGenerator=()=>{
    let res = []
    while(res.length <this.totalTicket){                
        const val = this.ticketHazar()                
        if(!res.includes(val)){
            res.push(val)
        }                
        }    
    return res
    }

    contadorBolas=()=>{        
        let res =[]
        for (let i = 0; i < this.maxBall ; i++) {
            if(i===0) continue
            res.push(i)    
        }
        return res
    }

    serial(){
        let res =[]        
        while(res.length<this.totalTicket){            
            let num =""    
            for(let i =0; i<9;i++){            
                const numberRandom = parseInt(Math.random()*9)
                num += numberRandom.toString()
            }
            if(!res.includes(num))
                res.push(num)

        }
        return res
    }

}
const x = new Lottery(50,24,6,10,100)

module.exports =  Lottery;