let initialState={
    data: {},
    wallet: {},
    gold: {},
    silver: {}
}

export default user = (state = initialState, action)=>{
switch(action.type){
    case 'SAVE_USER_FULFILLED':
        return{
            ...state,
            data : action.payload.data.response,
        }
    case 'SAVE_WALLET_FULFILLED':
        return{
            ...state,
            wallet : action.payload.data.response,
        }
    case 'GET_GOLD_PRICE_FULFILLED':
        return{
            ...state,
            gold : action.payload.data.response,
        }
    case 'GET_SILVER_PRICE_FULFILLED':
        return{
            ...state,
            silver : action.payload.data.response,
        }
    default:
        return state
}
}