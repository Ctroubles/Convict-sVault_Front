import { SEARCH_PRODUCT } from "./actions.type";
import axios from "axios";

export const searchProduct=(name)=>{
   return async dispatch=>{
    const {data}= await axios.get(`http://localhost:3001/products?name${name}`)
    .catch(error => console.log(error));
    dispatch ({
        type: SEARCH_PRODUCT,
        payload: data
    })
   }
};

// export const numPagChange=(num)=>{
//     return {
//         type: SET_NUM_PAGE,
//         payload: num
//     }
// }

