export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.item.Code === cartItemToAdd.item.Code
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.item.Code === cartItemToAdd.item.Code
        ? {
            ...cartItem,
            quantity: cartItem.quantity + cartItemToAdd.quantity,
            total: (
              (cartItem.quantity + cartItemToAdd.quantity) *
              Number(cartItemToAdd.item.Price)
            ).toFixed(2),
          }
        : cartItem
    );
  }
  return [
    ...cartItems,
    {
      ...cartItemToAdd,
      total: (
        cartItemToAdd.quantity * Number(cartItemToAdd.item.Price)
      ).toFixed(2),
    },
  ];
};

export const updateItemInCartWithInput = (cartItems, cartItemToUpdate) => {
  return cartItems.map((cartItem) =>
    cartItem.item.Code === cartItemToUpdate.item.Code
      ? {
          ...cartItem,
          quantity: cartItemToUpdate.quantity,
          total: (
            cartItemToUpdate.quantity * Number(cartItemToUpdate.item.Price)
          ).toFixed(2),
        }
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
      ? {
          ...cartItem,
          quantity: cartItem.quantity + cartItemToUpdate.quantity,
          total: (
            (cartItem.quantity + cartItemToUpdate.quantity) *
            Number(cartItemToUpdate.item.Price)
          ).toFixed(2),
        }
      : cartItem
  );
};
