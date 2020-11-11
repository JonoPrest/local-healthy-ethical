export const addItemToCart = (cartItems, cartItemToAdd) => {
  console.log(cartItemToAdd);
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.item.Code === cartItemToAdd.item.Code
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.item.Code === cartItemToAdd.item.Code
        ? { ...cartItem, quantity: cartItem.quantity + cartItemToAdd.quantity }
        : cartItem
    );
  }
  return [...cartItems, { ...cartItemToAdd }];
};

export const updateItemInCartWithInput = (cartItems, cartItemToUpdate) => {
  return cartItems.map((cartItem) =>
    cartItem.item.Code === cartItemToUpdate.item.Code
      ? { ...cartItem, quantity: cartItemToUpdate.quantity }
      : cartItem
  );
};

export const updateItemInCart = (cartItems, cartItemToUpdate) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.item.Code === cartItemToUpdate.item.Code
  );

  if (
    existingCartItem.quantity + cartItemToUpdate.quantity < 1 ||
    cartItemToUpdate.quantity === "remove"
  ) {
    return cartItems.filter(
      (cartItem) => cartItem.item.Code !== cartItemToUpdate.item.Code
    );
  }

  return cartItems.map((cartItem) =>
    cartItem.item.Code === cartItemToUpdate.item.Code
      ? { ...cartItem, quantity: cartItem.quantity + cartItemToUpdate.quantity }
      : cartItem
  );
};
