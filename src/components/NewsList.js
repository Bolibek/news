import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { newsFetched, removeNews, filteredNewsSelector } from "../app/slices/news";
import Loader from "./Loader";
import Error from "./Error";
import NewsListItem from "./NewsListItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function NewsList() {

	const filteredNews = useSelector(filteredNewsSelector);
	const newsLoadingStatus = useSelector(
		(state) => state.news.newsLoadingStatus
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(newsFetched());
	}, []);

	const deleteNews = (id) => {
		dispatch(removeNews(id));
		dispatch(newsFetched());
	};

	if (newsLoadingStatus === "loading") {
		return <Loader />;
	} else if (newsLoadingStatus === "error") {
		return <Error />;
	}

	const renderNewsList = (arr) => {
		if (arr.length === 0) {
			return <h3 className="text-center mt-5">News doesn't exist</h3>;
		}
		return arr
			.map(({ id, ...props }) => {
				return (
					<CSSTransition key={id} timeout={500} classNames="item">
						<NewsListItem removeNews={() => deleteNews(id)} {...props} />
					</CSSTransition>
				);
			})
			.reverse();
	};

	const elements = renderNewsList(filteredNews);

	return (
		<TransitionGroup component="ul" className="">
			{elements}
		</TransitionGroup>
	);
}