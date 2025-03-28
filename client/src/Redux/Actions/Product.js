import axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_REQUEST_SUCCESS,
    PRODUCT_LIST_REQUEST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_REQUEST_SUCCESS,
    PRODUCT_DETAILS_REQUEST_FAIL
} from '../Constants/Product'

import {BASE_URL} from '../Constants/BASE_URL';
export const productListAction = () => async (dispatch) => {
    try {
    dispatch({type: PRODUCT_LIST_REQUEST})
    const {data} = await axios.get(`${BASE_URL}/api/products`) 
    
    dispatch({type: PRODUCT_LIST_REQUEST_SUCCESS, payload: data})
} catch (error) {
    dispatch({
        type: PRODUCT_LIST_REQUEST_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
};
}



export const productAction = (id) => async (dispatch) => {
    console.log("Invoked")
    try {
    dispatch({type: PRODUCT_DETAILS_REQUEST})
    const {data} = await axios.get(`${BASE_URL}/api/products/${id}`);
    console.log(data)
    dispatch({type: PRODUCT_DETAILS_REQUEST_SUCCESS, payload: data})
} catch (error) {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
};
}