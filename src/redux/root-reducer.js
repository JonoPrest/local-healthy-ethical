import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "redux/cart/cart.reducer";
import userReducer from "redux/user/user.reducer";
import shopReducer from "redux/shop/shop.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
