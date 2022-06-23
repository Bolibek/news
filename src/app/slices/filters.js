import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { useHttp } from "../../hook/useHttp";

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
	filtersLoadingStatus: "bek",
	activeFilter: "All",
})


export const filterFetchedNews = createAsyncThunk(
	"filter/filterFetchedNews",
	async () => {
		const { request } = useHttp();
		return await request("http://localhost:3001/filters");
	}
);

const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		activeFilterChanged: (state, action) => {
			state.activeFilter = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(filterFetchedNews.pending, (state) => {
				state.filtersLoadingStatus = "loading";
			})
			.addCase(filterFetchedNews.fulfilled, (state, action) => {
				state.filtersLoadingStatus = "bek";
				filtersAdapter.setAll(state, action.payload);
			})
			.addCase(filterFetchedNews.rejected, (state) => {
				state.filtersLoadingStatus = "error";
			})
			.addDefaultCase(() => {});
	},
});

const {selectAll} = filtersAdapter.getSelectors(state => state.filters)
export const filtersArray = createSelector(
		selectAll,
		(filters) => {
			return filters
		}
)
const { actions, reducer } = filterSlice;

export default reducer;
export const { activeFilterChanged } = actions;