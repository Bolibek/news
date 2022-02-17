import { configureStore } from "@reduxjs/toolkit";
import news from './news';
import filter from './filter';
import stringMiddleware from "../middleWare/stringMiddleWare";



export const store = configureStore({
  reducer:{news, filter},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})