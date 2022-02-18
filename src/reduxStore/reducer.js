const initialState = {
	news: [],
	loadingStatus: "done",
	filteredNews: [],
	activeFilter: "All",
	filters: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "NEWS_FETCHING":
			return {
				...state,
				loadingStatus: "loading",
			};
		case "NEWS_FETCHED":
			return {
				...state,
				news: action.payload,
				filteredNews:
					state.activeFilter === "All"
						? action.payload
						: action.payload.filter((s) => s.category === state.activeFilter),
				loadingStatus: "done",
			};
		case "NEWS_FETCHING_ERROR":
			return {
				...state,
				loadingStatus: "error",
			};
		case "ADD_NEWS":
      const newCreatedNewsList = [...state.news, action.payload];
			return {
				...state,
				news: newCreatedNewsList,
        filteredNews: state.activeFilter === "All" ? newCreatedNewsList : newCreatedNewsList.filter(s => s.category === state.activeFilter)

			};
		case "REMOVE_NEWS":
      const leftNews = state.news.filter(s => s.id !== action.payload)
			return {
				...state,
				news: leftNews,
        filteredNews: state.activeFilter === "All" ? leftNews : leftNews.filter(s => s.category === state.activeFilter)
			};
		case "FILTER_FETCHING":
			return {
				...state,
				loadingStatus: "loading",
			};
		case "FILTER_FETCHED":
			return {
				...state,
				filters: action.payload,
				loadingStatus: "done",
			};
		case "FILTER_FETCHING_ERROR":
			return {
				...state,
				loadingStatus: "error",
			};
		case "FILTER_ACTIVE_CHANGER":
			return {
				...state,
				activeFilter: action.payload,
				filteredNews:
					action.payload === "All"
						? state.news
						: state.news.filter((s) => s.category === action.payload),
			};
		default:
			return state;
	}
};

export default reducer;
