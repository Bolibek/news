import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hook/useHttp";
import NewsListItem from "./NewsListItem";
import Spinner from "./Spinner";
import Error from "./Error";
import { firstFetcher, selectFilteredNews } from "../reduxStore/news";
import {removeNews} from "../reduxStore/news"
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../styles/news_list.css";

export default function NewsList() {

	const filteredNews = useSelector(selectFilteredNews);
	const loadingStatus = useSelector((state) => state.news.loadingStatus);
	const dispatch = useDispatch();
	const { request } = useHttp();
	useEffect(() => {
		dispatch(firstFetcher());
	}, []);

	const onDelete = useCallback((id) => {
		request(`http://localhost:5000/news/${id}`, "DELETE")
			.then((data) => console.log(data + "Deleted"))
			.then(dispatch(removeNews(id)))
			.catch((e) => console(e));
	}, []);


	if (loadingStatus === "loading") {
		return <Spinner />;
	} else if (loadingStatus === "error") {
		return <Error />;
	}
	const dataDistributor = (array) => {
		if (array.length === 0) {
			<CSSTransition timeout={500} classNames="item">
				return <h4 className="text-center mt-5">No News so far!</h4>;
			</CSSTransition>;
		}
		return array
			.map(({ id, ...restData }) => {
						return (					
						  <CSSTransition key={id} timeout={500} classNames="item">
			  	      <NewsListItem onDelete={() => onDelete(id)} {...restData} />
					    </CSSTransition>					
				    );
			})
			.reverse();
	};

	const newsPackages = dataDistributor(filteredNews);
	return <TransitionGroup component="ul">{newsPackages}</TransitionGroup>;
}
