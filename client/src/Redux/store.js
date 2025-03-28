import {combineReducers, createStore, applyMiddleware} from "redux";
import storage from "redux-persist/lib/storage"
import {persistStore, persistReducer} from "redux-persist"
import { productListReducer, productReducer } from "./Reducers/Product";
import { thunk } from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const rootReducer = combineReducers({
    productListReducer,
    productReducer
})
//const middleware = [thunk]

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk))

export let persistor = persistStore(store)