import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
} from "@reduxjs/toolkit";
import { useHttp } from "../../hook/useHttp";

const newsAdapter = createEntityAdapter();

const initialState = newsAdapter.getInitialState({
  newsLoadingStatus: "bek",
});

export const newsFetched = createAsyncThunk("news/newsFetched", async () => {
	const { request } = useHttp();
	return await request("http://localhost:3001/news");
});

export const addNews = createAsyncThunk("news/addNews", async (newNews) => {
	const { request } = useHttp();
	return await request(
		`http://localhost:3001/news`,
		"POST",
		JSON.stringify(newNews)
	);
});
export const removeNews = createAsyncThunk("news/removeNews", async (id) => {
	const { request } = useHttp();
	return await request(`http://localhost:3001/news/${id}`, "DELETE");
});

const newsSlice = createSlice({
	name: "news",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(newsFetched.pending, (state) => {
				state.newsLoadingStatus = "loading";
			})
			.addCase(newsFetched.fulfilled, (state, action) => {
				state.newsLoadingStatus = "bek";
				newsAdapter.setAll(state, action.payload);
			})
			.addCase(newsFetched.rejected, (state) => {
				state.newsLoadingStatus = "error";
			})
			.addCase(addNews.pending, (state) => {
				state.newsLoadingStatus = "loading";
			})
			.addCase(addNews.fulfilled, (state, action) => {
				state.newsLoadingStatus = "bek";
				newsAdapter.addOne(state, action.payload);
			})
			.addCase(addNews.rejected, (state) => {
				state.newsLoadingStatus = "error";
			})
			.addCase(removeNews.pending, (state) => {
				state.newsLoadingStatus = "loading";
			})
			.addCase(removeNews.fulfilled, (state, action) => {
				state.newsLoadingStatus = "bek";
				newsAdapter.removeOne(state, action.payload);
			})
			.addCase(removeNews.rejected, (state) => {
				state.newsLoadingStatus = "error";
			})
			.addDefaultCase(() => {});
	},
});

const {selectAll} = newsAdapter.getSelectors(state => state.news)
const { reducer } = newsSlice;
export const filteredNewsSelector = createSelector(
		state => state.filters.activeFilter,
		selectAll,
		(filter, news) => {
			if (filter === "All") {
				return news;
			} else {
				return news.filter(
					(s) => s.category === filter
				);
			}
		}
	);

export default reducer;