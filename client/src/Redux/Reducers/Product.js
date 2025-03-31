import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_REQUEST_SUCCESS,
    PRODUCT_LIST_REQUEST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_REQUEST_SUCCESS,
    PRODUCT_DETAILS_REQUEST_FAIL,
  } from "../Constants/Product";
  
  //list of products
  export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true, products: [] };
      case PRODUCT_LIST_REQUEST_SUCCESS:
        return {
          loading: false,
          products: action.payload,
          totalPage: action.payload.totalPage,
          page: action.payload.page,
        };
      case PRODUCT_LIST_REQUEST_FAIL:
        return { loading: false, error: action.payload.error };
      default:
        return state;
    }
  };
  
  //single product by id
  
  export const productReducer = (
    state = { product: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case PRODUCT_DETAILS_REQUEST_SUCCESS:
        return { loading: false, product: action.payload };
      case PRODUCT_DETAILS_REQUEST_FAIL:
        return { loading: false, error: action.payload.error };
      default:
        return state;
    }
  };
  