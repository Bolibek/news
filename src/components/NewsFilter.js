import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Error from "./Error";
import classNames from "classnames";
import {
	filterFetchedNews,
	activeFilterChanged,
	filtersArray
} from "../app/slices/filters";

export default function NewsFilter() {

	const filters = useSelector(filtersArray);
	const { filtersLoadingStatus, activeFilter } = useSelector(
		(state) => state.filters
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(filterFetchedNews());
	}, []);

	if (filtersLoadingStatus === "loading") {
		return <Loader />;
	} else if (filtersLoadingStatus === "error") {
		return <Error />;
	}

	const renderFilters = (arr = []) => {
		if (arr.length === 0) {
			return <h5 className="text-center mt-5">Filters doesn't found</h5>;
		}
		return arr.map(({ name, className, label }) => {
			const btnClasses = classNames("py-2 px-2.5", className, {
				active: name === activeFilter,
			});
			return (
				<button
					key={name}
					id={name}
					className={btnClasses}
					onClick={() => dispatch(activeFilterChanged(name))}
				>
					{label}
				</button>
			);
		});
	};

	const elements = renderFilters(filters);
	return (
		<div className="bg-gray-100 shadow-lg mt-6 pl-3.5 py-3.5 rounded-lg">
			<div className="card-body">
				<h5 className="card-text">Filter by category</h5>
				<div className="text-yellow-50 mt-2">{elements}</div>
			</div>
		</div>
	);
}