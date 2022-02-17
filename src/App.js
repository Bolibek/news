import Navbar from "./components/Navbar";
import NewsList from "./components/NewsList";
import NewsFilter from "./components//NewsFilter";
import AddNewsForm from "./components/AddNewsForm";

function App() {
	return (
		<div className="App">
			<Navbar />
			<div className="content">
				<NewsList />
				<div className="content__page">
					<AddNewsForm />
					<NewsFilter />
				</div>
			</div>
		</div>
	);
}

export default App;
