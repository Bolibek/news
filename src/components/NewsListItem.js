export default function NewsListItem({ name, description, category, removeNews }) {
	let elementClassName;
	switch (category) {
		case "Hot News":
			elementClassName = "bg-gradient-to-b from-green-500 ";
			break;
		case "Sport News":
			elementClassName = "bg-gradient-to-b from-blue-500 ";
			break;
		case "Policy News":
			elementClassName = "bg-gradient-to-b from-red-500";
			break;
		default:
			elementClassName = "bg-gradient-to-b from-purple-500";
	}

	return (
		<li className={`flex flex-row my-4 rounded-lg ${elementClassName}`}>
			<div className="flex flex-row p-4">
				<div className="w-72 mr-2">
					<div className="text-xl text-gray-100">{name}</div>
					<div className="text-sm text-gray-900">{description}</div>
				</div>
				<div className="image w-24 h-20 mt-2"></div>
			</div>
			<span className="-mt-1 -ml-3 text-2xl text-yellow-100 cursor-pointer" onClick={removeNews}>&times;</span>
		</li>
	);
}
