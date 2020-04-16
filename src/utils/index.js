export const convertToRp=(val)=>{
    if(val){
        const num = parseInt(val).toFixed(0)
        const rp = new Intl.NumberFormat('id-ID', {
        }).format(num)
        
        return 'Rp. ' + rp
    }
    return 
}

export function convertFromRp(num) {
    return (
        parseInt(num.replace(/[^0-9$]/g, ''))
    )
}

export const convertToGram=(val)=>{
    const gram = val/1000000
    return gram.toFixed(3)
}