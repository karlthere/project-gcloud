/** @format */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProjectDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const storedUser = JSON.parse(localStorage.getItem("user"));
				if (!storedUser || !storedUser.id) return;

				const res = await fetch(
					`http://localhost:5001/api/projects/${storedUser.id}`
				);
				const data = await res.json();

				const found = data.find((p) => p.id === parseInt(id));
				setProject(found || null);
			} catch (err) {
				console.error("Failed to fetch project:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [id]);

	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete this project?"))
			return;

		try {
			const res = await fetch(`http://localhost:5001/api/projects/${id}`, {
				method: "DELETE",
			});

			if (!res.ok) throw new Error("Delete failed");

			alert("Project deleted successfully!");
			navigate("/projects");
		} catch (err) {
			console.error("Failed to delete project:", err);
			alert("Error deleting project.");
		}
	};

	const handleCancel = () => navigate("/projects");
	const handleEdit = () => navigate(`/projects/edit/${id}`);

	if (loading)
		return <p className="text-white text-center">Loading project...</p>;
	if (!project)
		return (
			<div className="p-6 text-white">
				<h2 className="text-2xl font-bold">Project not found!</h2>
				<p>
					The project you are looking for does not exist or has been deleted.
				</p>
			</div>
		);

	return (
		<div className="min-h-screen bg-gray-900 p-6 text-white flex justify-center items-center">
			<div className="w-full max-w-4xl bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg space-y-8">
				{/* Title */}
				<div className="text-center">
					<h2 className="text-3xl font-bold">{project.title}</h2>
				</div>

				{/* Image */}
				<div className="flex justify-center">
					<img
						src={project.image_url}
						alt={project.title}
						className="w-full h-72 object-cover rounded-xl shadow-md"
					/>
				</div>

				{/* Details */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<span className="text-gray-400 text-sm">Category</span>
						<p className="text-lg">{project.category}</p>
					</div>
					<div>
						<span className="text-gray-400 text-sm">Difficulty</span>
						<p className="text-lg">{project.difficulty}</p>
					</div>
					<div>
						<span className="text-gray-400 text-sm">Status</span>
						<p className="text-lg">{project.status}</p>
					</div>
				</div>

				{/* Tags */}
				{project.tags && (
					<div>
						<h3 className="text-lg font-semibold">Tags</h3>
						<div className="flex flex-wrap gap-2 mt-2">
							{project.tags.split(",").map((tag, i) => (
								<span
									key={i}
									className="bg-blue-500/10 text-blue-300 px-3 py-1 rounded-full text-xs">
									{tag.trim()}
								</span>
							))}
						</div>
					</div>
				)}

				{/* Description */}
				<div>
					<h3 className="text-lg font-semibold">Description</h3>
					<p className="text-gray-300 mt-2">{project.description}</p>
				</div>

				{/* GitHub Link */}
				<div>
					<h3 className="text-lg font-semibold">GitHub Link</h3>
					<a
						href={project.github_link}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-400 hover:underline">
						{project.github_link}
					</a>
				</div>

				{/* References */}
				{project.references && (
					<div>
						<h3 className="text-lg font-semibold">References</h3>
						<ul className="mt-2 space-y-1 list-disc list-inside text-blue-300">
							{project.references
								.toString()
								.split(",")
								.map((ref, i) => (
									<li key={i}>
										<a
											href={ref.trim()}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:underline">
											{ref.trim()}
										</a>
									</li>
								))}
						</ul>
					</div>
				)}

				{/* Buttons */}
				<div className="flex flex-wrap justify-between gap-3 pt-4">
					<button
						onClick={handleCancel}
						className="bg-white/10 hover:bg-white/20 text-gray-300 px-4 py-2 rounded-full">
						Cancel
					</button>
					<button
						onClick={handleEdit}
						className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
						Edit
					</button>
					<button
						onClick={handleDelete}
						className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetail;
