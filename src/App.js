import Navbar from "./components/Navbar";
import NewsList from "./components/NewsList";
import NewsAddForm from "./components/NewsAddForm";
import NewsFilter from "./components/NewsFilter";
export default function App() {
	return (
		<div className="overflow-y-scroll h-[100vh] ">
			<Navbar />
			<div className="content grid mx-auto my-0 pt-10">
				<NewsList />
				<div className="ml-10">
					<NewsAddForm />
				 	<NewsFilter />
				</div>
			</div>
		</div>
	);
}