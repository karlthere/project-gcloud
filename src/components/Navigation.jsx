/** @format */

import { Link } from "react-router-dom";

const Navigation = ({
	selectedLevel,
	setSelectedLevel,
	selectedCategory,
	setSelectedCategory,
}) => {
	return (
		<nav className="mb-6 bg-soft-beige p-4 shadow-md rounded-md">
			{/* Links for Home and Add Project */}
			<Link to="/" className="text-dark-blue mr-4 hover:text-accent-orange">
				Home
			</Link>
			<Link
				to="/add-project"
				className="text-dark-blue hover:text-accent-orange">
				Add Project
			</Link>

			{/* Difficulty Level Filter */}
			<div className="flex justify-center mt-4">
				<button
					onClick={() => setSelectedLevel("Mudah")}
					className={`px-4 py-2 mr-4 text-lg rounded-full ${
						selectedLevel === "Mudah"
							? "bg-accent-orange text-white"
							: "bg-gray-200"
					}`}>
					Mudah
				</button>
				<button
					onClick={() => setSelectedLevel("Menengah")}
					className={`px-4 py-2 mr-4 text-lg rounded-full ${
						selectedLevel === "Menengah"
							? "bg-accent-orange text-white"
							: "bg-gray-200"
					}`}>
					Menengah
				</button>
				<button
					onClick={() => setSelectedLevel("Lanjutan")}
					className={`px-4 py-2 text-lg rounded-full ${
						selectedLevel === "Lanjutan"
							? "bg-accent-orange text-white"
							: "bg-gray-200"
					}`}>
					Lanjutan
				</button>
			</div>

			{/* Category Filter */}
			<div className="flex justify-center mt-4">
				<button
					onClick={() => setSelectedCategory("Frontend")}
					className={`px-4 py-2 mr-4 text-lg rounded-full ${
						selectedCategory === "Frontend"
							? "bg-accent-orange text-white"
							: "bg-gray-200"
					}`}>
					Frontend
				</button>
				<button
					onClick={() => setSelectedCategory("Backend")}
					className={`px-4 py-2 mr-4 text-lg rounded-full ${
						selectedCategory === "Backend"
							? "bg-accent-orange text-white"
							: "bg-gray-200"
					}`}>
					Backend
				</button>
				<button
					onClick={() => setSelectedCategory("Fullstack")}
					className={`px-4 py-2 text-lg rounded-full ${
						selectedCategory === "Fullstack"
							? "bg-accent-orange text-white"
							: "bg-gray-200"
					}`}>
					Fullstack
				</button>
			</div>
		</nav>
	);
};

export default Navigation;
