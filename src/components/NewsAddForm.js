import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import {addNews} from "../app/slices/news";
import { filtersArray } from "../app/slices/filters";

export default function NewsAddForm() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
  const filters = useSelector(filtersArray);
	const filtersLoadingStatus = useSelector(state => state.filters.filtersLoadingStatus);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		const newNews = {
			id: v4(),
			name,
			description,
			category,
		}
		dispatch(addNews( newNews));
		setName("");
		setDescription("");
		setCategory("");
	};

	const renderFilters = (news, status) => {
		if(status === "loading") {
			return <option>Loading options</option>
		}else if(status === "error") {
			return <option>Error options</option>
		}

		if(filters && filters.length > 0){
			return news.map(({name, label}) => {
				if(name === "All") return;
				return <option key={name} value={name}>{label}</option>
			})
		}
	}

	return (
		<form
			className="mt-4 p-4 shadow-2xl border-[1px] border-white rounded"
			onSubmit={handleSubmit}
		>
			<div className="mb-3">
				<label htmlFor="name-of-news" className="block mb-3 font-medium">
					Name for a new News
				</label>
				<input
					type="text"
					name="name-of-news"
					id="name-of-news"
					className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full p-2 rounded-md sm:text-sm border-gray-300"
					placeholder="Enter the name of the News"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="text" className="block mb-3 font-medium">
					Description for a new News
				</label>
				<textarea
					type="text"
					required
					name="text"
					className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block h-24 w-full p-2 sm:text-sm border border-gray-300 rounded-md"
					id="text"
					placeholder="What is the News about?"
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="category" className="block mb-3 font-medium">
					Category for a new News
				</label>
				<select
					required
					className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full p-2 rounded-md sm:text-sm border-gray-300"
					id="category"
					name="category"
					value={category}
					onChange={(event) => setCategory(event.target.value)}
				>
					<option>News about...</option>
					{renderFilters(filters, filtersLoadingStatus)}
				</select>
			</div>
			<button type="submit" className="w-full bg-gray-900 text-yellow-50 my-2 py-1 rounded-md">
				Create News
			</button>
		</form>
	);
}
