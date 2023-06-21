import { SEARCH_PRODUCT, SET_ID, SET_USER_CART } from "./actions.type";
import axios from "axios";

const setId = (payload) =>{
    return{
        type: SET_ID,
        payload
    }
};

const searchProduct=(name)=>{
   return async dispatch=>{
    const {data}= await axios.get(`http://localhost:3001/products?name${name}`)
    .catch(error => console.log(error));
    dispatch ({
        type: SEARCH_PRODUCT,
        payload: data
    })
   }
};

const setUserCart = (payload) =>{
    return{
        type: SET_USER_CART,
        payload,
    }
}


export {
    setId,
    searchProduct,
    setUserCart,
}