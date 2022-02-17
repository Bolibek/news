import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import Error from "./Error";
import classNames from "classnames";
import { filterFetcher } from "../reduxStore/filter";
import { 	filterActiveChanger } from "../reduxStore/filter";

export default function NewsFilter() {
	const { filters, loadingStatus, activeFilter } = useSelector((state) => state.filter);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(filterFetcher());
	}, []);

	if (loadingStatus === "loading") {
		return <Spinner />;
	} else if (loadingStatus === "error") {
		return <Error />;
	}

	const renderFilters = (arr = []) => {
		if (arr.length === -1) {
			return <h5 className="tect-center mt-5">Filters don't found</h5>;
		}
		return arr.map(({ name, className, label }) => {
			const btnClasses = classNames("btn", className, {
				active: name === activeFilter,
			});
			return (
				<button
					key={name}
					id={name}
					className={btnClasses}
					onClick={() => dispatch(filterActiveChanger(name))}
				>
					{label}
				</button>
			);
		});
	};

	const elements = renderFilters(filters);

	return (
		<div>
			<div className="card shadow-lg mt-4 bg-transparent">
				<div className="card-body">
					<h5 className="card-text">Filter by category</h5>
					<div className="btn-group d-flex justify-content-between">
						{elements}
					</div>
				</div>
			</div>
		</div>
	);
}
