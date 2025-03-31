import { combineReducers, createStore, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { productListReducer, productReducer } from "./Reducers/Product";
import { thunk } from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./Reducers/User";
import { cartReducer } from "./Reducers/Cart";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const rootReducer = combineReducers({
  productListReducer,
  productReducer,
  cartReducer,
  userLoginReducer,
  userRegisterReducer,
});
const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export let persistor = persistStore(store);
