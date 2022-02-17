import { useState } from "react";
import { useHttp } from "../hook/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import {addNews} from "../reduxStore/news";

export default function AddNewsForm() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
  const {filters, loadingStatus} = useSelector(state => state.filter)
	const dispatch = useDispatch();
	const {request} = useHttp();
  
	const handleSubmit = (e) => {
    e.preventDefault();
    const newNews = {id: v4(), name, description, category};
    request("http://localhost:5000/news", "POST", JSON.stringify(newNews))
      .then(res => console.log(res))
      .then(dispatch(addNews(newNews)))
      .catch(err => console.log(err))

    setName("")
    setCategory("")
    setDescription("")
  }
	
	const renderFilters = (filters, status) => {
		if(status === "loading") {
			return <option>Loading options</option>
		}else if(status === "error") {
			return <option>Error options</option>
		}

		if(filters && filters.length > 0){
			return filters.map(({name, label}) => {
				if(name === "All") return;
				return <option key={name} value={name}>{label}</option>
			})
		}
	}

	return (
		<form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
			<div className="mb-3">
				<label htmlFor="name" className="form-label fs-5">
					Name for a new News
				</label>
				<input
					type="text"
					required
					name="name"
					className="form-control"
					id="name"
					placeholder="What is the name of the News"
					value={name}
					onChange={(event) => setName(event.target.value)}
					
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="text" className="form-label fs-5">
					Description for a new News
				</label>
				<textarea
					type="text"
					required
					name="text"
					className="form-control"
					id="text"
					placeholder="What is the News about?"
					value={description}
					onChange={(event) => setDescription(event.target.value)}
					
				/>
			</div>
			<div className="mb-3">
				<label htmlFor="category" className="form-label fs-5">
					Category for a new News
				</label>
				<select
					required
					className="form-select"
					id="category"
					name="category"
					value={category}
					onChange={(event) => setCategory(event.target.value)}
				>
					<option>News about...</option>
					
					{renderFilters(filters, loadingStatus)}
				</select>
			</div>
			<button type="submit" className="btn btn-dark shadow-lg w-100 text-light">
				Create News
			</button>
		</form>
	);
}
