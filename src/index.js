import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);



// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// // import reducer from "./app/reducer";
// import news from "./app/reducers/news";
// import filters from "./app/reducers/filters";
// import { createStore, combineReducers, compose, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import ReduxThank from "redux-thunk";

// const stringMiddleware = (store) => (next) => (action) => {
// 	if (typeof action === "string") {
// 		return store.dispatch({ type: action });
// 	}
// 	return next(action);
// };

// const store = createStore(
// 	combineReducers({ news, filters }),
// 	compose(
// 		applyMiddleware(ReduxThank, stringMiddleware),
// 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// 	)
// );

// // const stringMiddleware = (store) => (next) => (action) => {
// // 	if (typeof action === "string") {
// // 		return store.dispatch({ type: action });
// // 	}
// // 	return next(action);
// // }

// // const store = createStore(
// // 	combineReducers({ news, filters }),
// // 	compose(applyMiddleware(stringMiddleware),
// // 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// // 	)
// // );

// // const enhancer =
// // 	(createStore) =>
// // 	(...args) => {
// // 		const store = createStore(...args);
// // 		const oldDispatch = store.dispatch;
// // 		store.dispatch = (action) => {
// // 			if (typeof action === "string") {
// // 				return oldDispatch({ type: action });
// // 			}
// // 			return oldDispatch(action);
// // 		};
// // 		return store;
// // 	};

// // const store = createStore(
// // 	combineReducers({ news, filters }),
// // 	compose(
// // 		enhancer,
// // 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// // 	)
// // );
// // const store = createStore(combineReducers({news, filters}),  enhancer);
// // const store = createStore(combineReducers({news, filters}),  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// // const store = createStore(reducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
// 	<Provider store={store}>
// 		<App />
// 	</Provider>
// );

// const root = ReactDOM.createRoot(document.getElementById("root"));
// 	root.render(
// 		// <Provider store={store}>
// 			<App />
// 		// </Provider>
// 	);

// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// // import store from './app/store'
// import { reducer } from "./app/reducer";
// import { createStore, bindActionCreators } from "redux";
// import * as actions from "./app/actions";
// import { Provider } from "react-redux";
// import Counter from "./components/Counter";

// const store = createStore(reducer);
// const { dispatch, getState, subscribe } = store;
// const { increment, decrement, random } = bindActionCreators(actions, dispatch);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// const update = () => {
// 	root.render(
// 		// <Provider store={store}>
//       <>
// 			<Counter
// 				counter={getState().value}
// 				increment={increment}
// 				decrement={decrement}
// 				random={random}
// 			/>
//       </>
// 		// </Provider>
// 	);
// }
// update();
// subscribe(update);
