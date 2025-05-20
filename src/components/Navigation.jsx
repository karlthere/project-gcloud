/** @format */

import { Link } from "react-router-dom";

const Navigation = ({
	selectedLevel,
	setSelectedLevel,
	selectedCategory,
	setSelectedCategory,
}) => {
	return (
		<nav className="mb-6 bg-soft-beige p-4 shadow-md rounded-md space-y-4">
			{/* Top Links */}
			<div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
				<Link
					to="/"
					className="text-dark-blue hover:text-accent-orange transition">
					🏠 Home
				</Link>
				<Link
					to="/add-project"
					className="text-dark-blue hover:text-accent-orange transition">
					➕ Add Project
				</Link>
			</div>

			{/* Filter by Level */}
			<div className="flex flex-wrap justify-center gap-2">
				{["Mudah", "Menengah", "Lanjutan"].map((level) => (
					<button
						key={level}
						onClick={() => setSelectedLevel(level)}
						className={`px-4 py-1.5 text-sm md:text-base rounded-full transition ${
							selectedLevel === level
								? "bg-accent-orange text-white"
								: "bg-gray-200 text-gray-800 hover:bg-gray-300"
						}`}>
						{level}
					</button>
				))}
			</div>

			{/* Filter by Category */}
			<div className="flex flex-wrap justify-center gap-2">
				{["Frontend", "Backend", "Fullstack"].map((category) => (
					<button
						key={category}
						onClick={() => setSelectedCategory(category)}
						className={`px-4 py-1.5 text-sm md:text-base rounded-full transition ${
							selectedCategory === category
								? "bg-accent-orange text-white"
								: "bg-gray-200 text-gray-800 hover:bg-gray-300"
						}`}>
						{category}
					</button>
				))}
			</div>
		</nav>
	);
};

export default Navigation;
