import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
  shopData: [],
  isFetching: false,
  errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_SHOP_DATA_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopActionTypes.FETCH_SHOP_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        shopData: action.payload,
      };
    case ShopActionTypes.FETCH_SHOP_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
