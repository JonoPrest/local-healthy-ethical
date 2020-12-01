import ShopActionTypes from "./shop.types";
import Papa from "papaparse";
import { getShopSettings } from "firebaseUtilities";
import { getShopData } from "firebaseUtilities";

export const fetchShopDataStart = () => ({
  type: ShopActionTypes.FETCH_SHOP_DATA_START,
});

export const fetchShopDataSuccess = (shopData) => ({
  type: ShopActionTypes.FETCH_SHOP_DATA_SUCCESS,
  payload: shopData,
});

export const fetchShopDataFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_SHOP_DATA_FAILURE,
  payload: errorMessage,
});

export const fetchShopSettingsStart = () => ({
  type: ShopActionTypes.FETCH_SHOP_SETTINGS_START,
});

export const fetchShopSettingsSuccess = (shopData) => ({
  type: ShopActionTypes.FETCH_SHOP_SETTINGS_SUCCESS,
  payload: shopData,
});

export const fetchShopSettingsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_SHOP_SETTINGS_FAILURE,
  payload: errorMessage,
});

export const fetchShopDataStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchShopDataStart());

    getShopData()
      .then((res) => dispatch(fetchShopDataSuccess(res)))
      .catch((err) => dispatch(fetchShopSettingsFailure(err)));
  };
};

export const fetchShopSettingsStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchShopSettingsStart());

    getShopSettings()
      .then((res) => dispatch(fetchShopSettingsSuccess(res)))
      .catch((err) => dispatch(fetchShopSettingsFailure(err.message)));
  };
};
