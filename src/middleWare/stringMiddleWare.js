const stringMiddleware = (store) => (next) => (action) => {
	if (typeof action === "string") {
		return store.dispatch({ type: action });
	}
	return next(action);
};

export default stringMiddleware;