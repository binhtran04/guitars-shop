import { GET_PRODUCTS_BY_ARRIVAL, GET_PRODUCTS_BY_SOLD } from '../actions/types';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_PRODUCTS_BY_SOLD:
            return {...state, bySold: action.payload};
        case GET_PRODUCTS_BY_ARRIVAL:
            return {...state, byArrival: action.payload};
        default:
            return state;
    }
}