import { 
    GET_PRODUCTS_BY_ARRIVAL, 
    GET_PRODUCTS_BY_SOLD,
    GET_PRODUCTS_TO_SHOP,
    GET_BRANDS,
    GET_WOODS
} from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_PRODUCTS_BY_SOLD:
            return {...state, bySold: action.payload};
        case GET_PRODUCTS_BY_ARRIVAL:
            return {...state, byArrival: action.payload};
        case GET_BRANDS:
            return {...state, brands: action.payload};
        case GET_WOODS:
            return {...state, woods: action.payload};
        case GET_PRODUCTS_TO_SHOP: 
            return {...state,
                toShop: action.payload.products,
                toShopSize: action.payload.size
            };
        default:
            return state;
    }
}