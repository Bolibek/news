import { createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";
import {useHttp} from "../hook/useHttp";

const filterAdapter = createEntityAdapter();

const initialState = filterAdapter.getInitialState({
		loadingStatus: "done",
		activeFilter: "All",
});

const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		filterActiveChanger: (state, action) => {state.activeFilter = action.payload}
	},
	extraReducers: builder => {
		builder
		  .addCase(filterFetcher.pending, (state) => {state.loadingStatus = 'loading'})
		  .addCase(filterFetcher.fulfilled, (state, action) => {
        state.filters = action.payload;
		    state.loadingStatus = "done";
      })
			.addCase(filterFetcher.rejected, (state) => {state.loadingStatus = "error"})
			.addDefaultCase(() => {})
	}
})

export const filterFetcher = createAsyncThunk(
	"filter/filterFetcher",
	async () => {
    const {request} = useHttp();
    return await request(`http://localhost:5000/filters`)
	}
)

const {actions, reducer} = filterSlice;
export default reducer;
export const {filterActiveChanger} = actions
