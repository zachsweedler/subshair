"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import uploadReducer from "./slices/uploadSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  debug: true
};

const rootReducer = combineReducers({
  filter: filterReducer,
  propertyUpload: uploadReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

