import { SEARCH_PRODUCT, SET_ID, SET_USER_CART } from "./actions.type";
import axios from "axios";
import Url_deploy_back from "../../../util/deploy_back";


const setId = (payload) =>{
    return{
        type: SET_ID,
        payload
    }
};

const searchProduct=(name)=>{
   return async dispatch=>{
    const {data}= await axios.get(`${Url_deploy_back}/products?name${name}`)
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