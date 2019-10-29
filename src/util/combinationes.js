const  equal =require( "assert").equal

class TeoriCombinatoria{        
    
    factorial =(n)=>{
        let res = 1 
        for(let i=0;i<n+1;i++){
            if(i===0)            
                continue        
            res *=i        
        }
        return res
    }
    variacion=(n,r)=>{
        const n_abs = Math.abs(n)
        const r_abs = Math.abs(r)
        if(r>n)
        {console.log("r no puede ser mayor a n");    
        return null
        }    
        let res = n_abs
        let valor = n_abs
        for(let i=0; i<r_abs; i++){                        
            if(i===0) continue
            valor -= 1
            res *=valor            
        }
        return res
    }
    /*    rCn = n!/r!(n-r)! */
    combinacion = (n,r)=>{    
        const n_fact = this.factorial(n)
        const r_fact = this.factorial(r)
        const rn = n - r
        const rn_fact = this.factorial(rn)
        const res = n_fact / (r_fact * rn_fact)    
        return res
    }
    }    
 

    /*
    
    for(let jj=0;jj<100000;jj++) //while(true)
    {
        let a=[]
        //if(ar.length == k.variacion(10,3))
        //break        
        while (a.length < 3)
        {
            let i = items[parseInt(Math.random() * items.length)]                        
            if(a.includes(i))
            continue            
            a.push(i)
        }
        console.log(a.join()," y ", a.reverse().join());
        
        if(ar.includes(a.join())||ar.includes(a.reverse().join()))
        continue
        else
        ar.push(a.join())
    }
        
        
    console.log("combinaciones ",k.combinacion(10,3));
    
console.log(ar.length);*/
