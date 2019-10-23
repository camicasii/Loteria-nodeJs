Math.random()
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
        for(i=0; i<r_abs; i++){                        
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

