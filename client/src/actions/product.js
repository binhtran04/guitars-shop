import axios from 'axios';
import { 
    GET_PRODUCTS_BY_SOLD, 
    GET_PRODUCTS_BY_ARRIVAL,
    GET_BRANDS,
    GET_WOODS
} from './types';
import { 
    PRODUCT_SERVER,
    BRAND_SERVER,
    WOODS_SERVER
} from '../utils/misc';

export function getProductsBySold() {
    const request = axios.get(`${PRODUCT_SERVER}/?sortBy=sold&order=desc&limit=4`)
        .then(response => response.data)
    
    return {
        type: GET_PRODUCTS_BY_SOLD,
        payload: request
    }
}

export function getProductsByArrival() {
    const request = axios.get(`${PRODUCT_SERVER}/?sortBy=createdAt&order=desc&limit=4`)
        .then(response => response.data)
    
    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: request
    }
}

// Categories

export function getBrands() {
    const request = axios.get(`${BRAND_SERVER}`)
        .then(response => response.data); 

    return {
        type: GET_BRANDS,
        payload: request
    }
}


export function getWoods() {
    const request = axios.get(`${WOODS_SERVER}`)
        .then(response => response.data); 

    return {
        type: GET_WOODS,
        payload: request
    }
}