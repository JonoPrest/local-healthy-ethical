import ShopActionTypes from "./shop.types";
import Papa from "papaparse";

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

export const fetchShopDataStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchShopDataStart());


    const proxyUrl = "https://agile-anchorage-79298.herokuapp.com/";
    const apiURL =
      "https://docs.google.com/spreadsheets/d/1T2EV-ArYBTgchH1h89pqK0ffc77EDTffItpNqoHosd0/export?format=csv";

    // Get google sheet data using papa parse

    Papa.parse(proxyUrl + apiURL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      comments: "#",
      complete: function (results) {
        dispatch(fetchShopDataSuccess(results.data));
      },
      error: (error) => {
        dispatch(fetchShopDataFailure(error.message));
      },
    });
  };
};
