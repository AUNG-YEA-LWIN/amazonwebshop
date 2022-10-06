import {getProductsReducer} from './ProductReducer';
import {combineReducers} from "redux";

const rootreducers = combineReducers({
    getproductsdata : getProductsReducer
});

export default rootreducers;