import { createSlice, createAsyncThunk, createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {useHttp} from "../hook/useHttp";

const newsAdapter = createEntityAdapter();
const initialState = newsAdapter.getInitialState({
	loadingStatus: "done",
})

const newsSlice = createSlice({
	name: "news",
	initialState,
	reducers: {
		removeNews: (state, action) => {newsAdapter.removeOne(state, action.payload)},
		addNews: (state, action) => {newsAdapter.addOne(state, action.payload)}
	},
	extraReducers: builder => {
		builder
		  .addCase(firstFetcher.pending, (state) => {state.loadingStatus = 'loading'})
		  .addCase(firstFetcher.fulfilled, (state, action) => {
        newsAdapter.setAll(state, action.payload);
				state.loadingStatus = "done";
			})
			.addCase(firstFetcher.rejected, (state) => {state.loadingStatus = "error"})
			.addDefaultCase(() => {})
	}
})

export const firstFetcher = createAsyncThunk(
	"news/firstFetcher",
	async () => {
    const {request} = useHttp();
    return await request(`http://localhost:5000/news`)
	}
)

const {selectAll} = newsAdapter.getSelectors(state => state.news)
export	const selectFilteredNews = createSelector(
	(state) => state.filter.activeFilter,
	selectAll,
	(filter, news) => {
		return filter === "All" ? news : news.filter((s) => s.category === filter);
	}
);

const {actions, reducer} = newsSlice;
export default reducer;
export const {removeNews, addNews} = actions;

