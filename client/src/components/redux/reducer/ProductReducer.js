const products = []

export const getProductsReducer = (state = {products},action) => {
    // eslint-disable-next-line default-case
    switch(action.type) {
        case "SUCCESS_GET_PRODUCTS": 
            return {products : action.payload}
        case "FAIL_GET_PRODUCTS": 
            return {products : action.payload}
        default : 
            return state
    }
}