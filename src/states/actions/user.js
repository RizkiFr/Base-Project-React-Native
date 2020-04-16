import axios from 'axios';

export const saveUser=(token)=>{
    return{
        type: 'SAVE_USER',
        payload: axios.get(`/shariacoin_pay/user_profile?token=${token}`),
    }
}

export const saveWallet=(token)=>{
    return{
        type: 'SAVE_WALLET',
        payload: axios.get(`/shariacoin_pay/view_rekening?token=${token}`)
    }
}

export const getGoldPrice=(token)=>{
    return{
        type: 'GET_GOLD_PRICE',
        payload: axios.get(`/shariacoin/get_hargaemas?token=${token}`)
    }
}

export const getSilverPrice=(token)=>{
    return{
        type: 'GET_SILVER_PRICE',
        payload: axios.get(`/shariacoin/get_hargaperak?token=${token}`)
    }
}