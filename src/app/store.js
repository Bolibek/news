import news from "./slices/news";
import filters from "./slices/filters";
import { configureStore } from "@reduxjs/toolkit";
import stringMiddleware from "../middleware/stringMiddleware";

const store = configureStore({
	reducer: {
		news,
		filters
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV === "production" ? false : true,
});

export default store;
