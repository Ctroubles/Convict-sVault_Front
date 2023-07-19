import { SEARCH_PRODUCT, SET_ID, SET_USER_CART, } from "../actions/actions.type"


const cartInStorage = localStorage.getItem("cart");
const parsedCartData = cartInStorage ? JSON.parse(cartInStorage) : [];

const initialState = {
  id: null,
  searchBar: [],
  numPag: 0,
  paginated: [],
  cart: parsedCartData,
};

const rootReducer=(state= initialState, { type, payload })=> {
 switch (type) {
    case SET_ID:
        return{
            ...state,
            id:payload
        }
    case SEARCH_PRODUCT:
        return {
            ...state,
            searchBar: payload
        };
    case SET_USER_CART:
        if (!state.id) {
            localStorage.setItem("cart", JSON.stringify(payload))
        }
        return{
            ...state,
            cart:payload,
        }
    default:
        return{
            ...state
        }
 }
}

export default rootReducer;