import { SEARCH_PRODUCT, SET_ID, SET_USER_CART, } from "../actions/actions.type"
// import { paginationArray } from "../../../util/index"
const initialState={
    id:null,
    searchBar: [],
    numPag: 0,
    paginated:[],
    cart:[],
}
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