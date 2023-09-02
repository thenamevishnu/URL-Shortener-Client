import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from  "./userSlice"
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'

const nonSerializableMiddleware = getDefaultMiddleware({
    serializableCheck: false,
  });

const persistConfig={
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const Store = configureStore({
    reducer: {
        users: persistedReducer,
    },
    middleware:nonSerializableMiddleware
})

export const persistor = persistStore(Store)