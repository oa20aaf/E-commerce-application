import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_UPDATE_QTY,
    CART_CLEAR_ITEMS,
  } from "../Constants/Cart";
  
  // ADD ITEM TO CART
  export const addToCart = (product, qty) => (dispatch, getState) => {
    if (!product) return;
  
    dispatch({
      type: CART_ADD_ITEM,
      payload: { ...product, qty },
    });
  
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems || [])
    );
  };
  
  // UPDATE QUANTITY
  export const updateCartQty = (id, qty) => (dispatch, getState) => {
    if (qty < 1) return;
  
    const { cartItems } = getState().cartReducer;
  
    // Check if the item exists in the cart
    const itemExists = cartItems.some((item) => item._id === id);
    if (!itemExists) return;
  
    dispatch({
      type: CART_UPDATE_QTY,
      payload: { id, qty },
    });
  
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems || [])
    );
  };
  
  // REMOVE ITEM FROM CART
  export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });
  
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems || [])
    );
  };
  
  // CLEAR CART
  export const clearCart = () => (dispatch) => {
    dispatch({
      type: CART_CLEAR_ITEMS,
    });
  
    localStorage.removeItem("cartItems");
  };
  