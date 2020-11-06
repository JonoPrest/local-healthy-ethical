import CartActionTypes from "./cart.types";

export const addItem = (item, quantity) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: { item, quantity },
});

export const updateItem = (item, quantity) => ({
  type: CartActionTypes.UPDATE_ITEM,
  payload: { item, quantity },
});

export const updateItemWithInput = (item, quantity) => ({
  type: CartActionTypes.UPDATE_ITEM_WITH_INPUT,
  payload: { item, quantity },
});

export const clearItemFromCart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const clearCart = (item) => ({
  type: CartActionTypes.CLEAR_CART,
  payload: item,
});
