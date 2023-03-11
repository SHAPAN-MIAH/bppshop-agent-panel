import { combineReducers, createStore } from "redux";
import UserReducer from "./Reducers/UserReducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducers  = combineReducers({
  users: UserReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(persistedReducer, composeWithDevTools());

export const Persister = persistStore(store);

export default store;