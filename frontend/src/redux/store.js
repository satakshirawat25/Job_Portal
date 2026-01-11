// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authSlice from "./authSlice.js"
// import jobSlice from './jobSlice.js'
// import {
//     persistStore,
//    persistReducer,
//     FLUSH,
//     REHYDRATE,PAUSE,
//     PERSIST,PURGE,
//     REGISTER
// }from 'redux-persist'
// import storage from 'redux-persist/lib/storage'



// const persistConfig ={
//     key:'root',
//     version:1,
//     storage,
// }
// const rootReducer = combineReducers({
//     auth:authSlice,
//     job:jobSlice
// })

// const persistedReducer = persistReducer(persistConfig,rootReducer)

// const store =  configureStore({
//    reducer:persistedReducer,
//    middleware:(getDefaultMiddleware)=>
//     getDefaultMiddleware({
//         serializableCheck:{
//             ignoreActions:[FLUSH,REGISTER,PAUSE,REHYDRATE,PERSIST,PURGE]
//         }
//     })
// })
// export default store



import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from './companySlice.js'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company:companySlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
