/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import ProjectCard from "./ProjectCard";
import ErrorBoundary from "./ErrorBoundary";

const ProjectList = () => {
	const navigate = useNavigate();
	const storedUser = JSON.parse(localStorage.getItem("user"));
	const { projects, loading } = useProjects(storedUser?.id);

	const [selectedLevel, setSelectedLevel] = useState("Semua");
	const [selectedCategory, setSelectedCategory] = useState("Semua");
	const [selectedStatus, setSelectedStatus] = useState("Semua");
	const [searchQuery, setSearchQuery] = useState("");

	const safeProjects = Array.isArray(projects) ? projects : [];

	const filteredProjects = safeProjects.filter((project) => {
		if (!project || !project.title) return false;

		return (
			(selectedLevel === "Semua" || project.difficulty === selectedLevel) &&
			(selectedCategory === "Semua" || project.category === selectedCategory) &&
			(selectedStatus === "Semua" || project.status === selectedStatus) &&
			project.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
	});

	return (
		<ErrorBoundary>
			<div className="p-4 md:p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white transition-all">
				<div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl shadow-lg space-y-10">
					{/* Header, Search, Add Button */}
					<div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:items-center sm:justify-between mb-4">
						<h1 className="text-xl md:text-2xl font-bold">📁 Project List</h1>

						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search Projects..."
							className="w-full sm:w-64 px-4 py-2 rounded-md bg-white/10 text-white border border-white/20 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>

						<button
							className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
							onClick={() => navigate("/AddProject")}>
							➕ Add Project
						</button>
					</div>

					{/* Filter Groups */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<FilterGroup
							label="Filter Level"
							options={["Semua", "Mudah", "Menengah", "Lanjutan"]}
							selected={selectedLevel}
							onChange={setSelectedLevel}
						/>
						<FilterGroup
							label="Category"
							options={["Semua", "Frontend", "Backend", "Fullstack"]}
							selected={selectedCategory}
							onChange={setSelectedCategory}
						/>
						<FilterGroup
							label="Project Status"
							options={["Semua", "Belum dikerjakan", "On-Going", "Done"]}
							selected={selectedStatus}
							onChange={setSelectedStatus}
						/>
					</div>

					{/* Project Grid */}
					{loading ? (
						<p className="text-center text-white">Loading projects...</p>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
							{filteredProjects.length > 0 ? (
								filteredProjects.map((project) => (
									<ProjectCard key={project.id} project={project} />
								))
							) : (
								<p className="text-white col-span-full text-center">
									No projects found.
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</ErrorBoundary>
	);
};

// 🔧 FilterGroup Component
const FilterGroup = ({ label, options, selected, onChange }) => (
	<div>
		<h3 className="font-semibold text-white mb-2">{label}</h3>
		<div className="flex flex-wrap gap-2 overflow-x-auto">
			{options.map((option) => (
				<button
					key={option}
					onClick={() => onChange(option)}
					className={`px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${
						selected === option
							? "bg-blue-600 text-white border-blue-400"
							: "bg-white/10 text-gray-300 border-white/20 hover:bg-white/20"
					}`}>
					{option}
				</button>
			))}
		</div>
	</div>
);

export default ProjectList;
