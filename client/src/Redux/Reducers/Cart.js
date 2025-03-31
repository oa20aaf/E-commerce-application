import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_UPDATE_QTY,
    CART_CLEAR_ITEMS,
  } from "../Constants/Cart";
  import { toast } from "react-toastify";
  
  const initialState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    totalItems: 0,
    totalPrice: 0,
  };
  
  export const cartReducer = (state = initialState, action) => {
    if (!state) return initialState;
  
    let updatedCart;
  
    switch (action.type) {
      case CART_UPDATE_QTY:
        updatedCart = state?.cartItems.map((item) =>
          item._id === action.payload.id
            ? { ...item, qty: Math.max(1, Number(action.payload.qty) || 1) }
            : item
        );
        return {
          ...state,
          cartItems: updatedCart,
          totalItems: updatedCart.reduce((sum, item) => sum + item.qty, 0),
          totalPrice: updatedCart.reduce(
            (sum, item) => sum + item.qty * item.Price,
            0
          ),
        };
  
      case CART_ADD_ITEM:
        const newItem = action.payload;
        const existItem = state.cartItems.find(
          (item) => item._id === newItem._id
        );
  
        if (existItem) {
          // If the item exists, update its quantity
          const updatedCart = state.cartItems.map((item) =>
            item._id === newItem._id
              ? { ...item, qty: item.qty + newItem.qty }
              : item
          );
  
          toast.info(`Item already Added to cart`, {
            position: "top-right",
            autoClose: 3000,
          });
  
          return {
            ...state,
            cartItems: updatedCart,
            totalItems: updatedCart.reduce((sum, item) => sum + item.qty, 0),
            totalPrice: updatedCart.reduce(
              (sum, item) => sum + item.qty * item.Price,
              0
            ),
          };
        } else {
          // If item doesn't exist, add it to the cart
          const updatedCart = [...state.cartItems, newItem];
  
          toast.success(`Item added to cart`, {
            position: "top-right",
            autoClose: 3000,
          });
  
          return {
            ...state,
            cartItems: updatedCart,
            totalItems: updatedCart.reduce((sum, item) => sum + item.qty, 0),
            totalPrice: updatedCart.reduce(
              (sum, item) => sum + item.qty * item.Price,
              0
            ),
          };
        }
  
      case CART_REMOVE_ITEM:
        return {
          ...state,
          cartItems: state?.cartItems.filter(
            (item) => item._id !== action.payload
          ),
        };
  
      case CART_CLEAR_ITEMS:
        return {
          ...state,
          cartItems: [],
        };
  
      default:
        return state || initialState;
    }
  };
  