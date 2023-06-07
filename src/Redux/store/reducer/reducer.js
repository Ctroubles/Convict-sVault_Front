import { SEARCH_PRODUCT, } from "../actions/actions.type"
// import { paginationArray } from "../../../util/index"
const initialState={
    searchBar: [],
    numPag: 0,
    paginated:[],
}
const rootReducer=(state= initialState, { type, payload })=> {
 switch (type) {
    case SEARCH_PRODUCT:
        return {
            ...state,
            searchBar: payload
        };
    default:
        return{
            ...state
        }
 }
}

export default rootReducer;