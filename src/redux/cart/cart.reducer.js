import CartActionTypes from "./cart.types";
import {
  addItemToCart,
  updateItemInCart,
  updateItemInCartWithInput,
} from "./cart.utils";

const INITIAL_STATE = {
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.UPDATE_ITEM:
      return {
        ...state,
        cartItems: updateItemInCart(state.cartItems, action.payload),
      };
    case CartActionTypes.UPDATE_ITEM_WITH_INPUT:
      return {
        ...state,
        cartItems: updateItemInCartWithInput(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
