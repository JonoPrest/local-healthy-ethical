import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
  shopData: [],
  supplierInfo: [],
  isFetching: false,
  errorMessage: undefined,
  shopSettings: {
    shopIsLive: false,
    orderGroupName: "",
    marketDayFee: null,
  },
  isFetchingSettings: false,
  shopSettingsLoaded: false,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_SHOP_SETTINGS_START:
      return {
        ...state,
        isFetchingSettings: true,
        shopSettingsLoaded: false,
      };

    case ShopActionTypes.FETCH_SHOP_SETTINGS_SUCCESS:
      return {
        ...state,
        shopSettings: action.payload,
        isFetchingSettings: false,
        shopSettingsLoaded: true,
      };

    case ShopActionTypes.FETCH_SHOP_SETTINGS_FAILURE:
      console.error(action.payload);
      return {
        ...state,
        errorMessage: action.payload,
        isFetchingSettings: false,
        shopSettingsLoaded: false,
      };

    case ShopActionTypes.FETCH_SHOP_DATA_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopActionTypes.FETCH_SHOP_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        shopData: action.payload.shopItems,
        supplierInfo: action.payload.supplierInfo,
        shopSettingsLoaded: true,
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
