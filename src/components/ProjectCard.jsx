/** @format */

import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
	const getStatusStyle = (status) => {
		switch (status) {
			case "Done":
				return "bg-green-500/10 text-green-300";
			case "On-Going":
				return "bg-yellow-400/10 text-yellow-300";
			case "Belum dikerjakan":
				return "bg-gray-500/10 text-gray-300";
			default:
				return "bg-white/10 text-white";
		}
	};

	return (
		<div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl shadow-sm transition hover:shadow-lg hover:scale-[1.01] duration-200 overflow-hidden">
			{/* Navigasi ke detail */}
			<Link to={`/projects/${project.id}`} className="block">
				{/* Image */}
				<img
					src={project.image_url}
					alt={project.title}
					className="w-full h-40 object-cover rounded-t-xl"
				/>

				<div className="p-4 space-y-2">
					{/* Title */}
					<h3 className="text-lg font-semibold text-white">{project.title}</h3>

					{/* Category & Difficulty */}
					<div className="flex flex-wrap gap-2 text-xs">
						<span className="bg-white/10 text-gray-300 px-2 py-1 rounded-full">
							{project.category}
						</span>
						<span className="bg-white/10 text-gray-300 px-2 py-1 rounded-full">
							{project.difficulty}
						</span>
					</div>

					{/* Tags */}
					{project.tags && (
						<div className="flex flex-wrap gap-2 text-xs break-words">
							{project.tags.split(",").map((tag, i) => (
								<span
									key={i}
									className="bg-blue-500/10 text-blue-300 px-2 py-1 rounded-full break-all">
									{tag.trim()}
								</span>
							))}
						</div>
					)}

					{/* Status */}
					<span
						className={`inline-block text-xs px-3 py-1 rounded-full ${getStatusStyle(
							project.status
						)}`}>
						{project.status}
					</span>

					{/* Description */}
					<p className="text-sm text-gray-300 line-clamp-3">
						{project.description}
					</p>
				</div>
			</Link>

			{/* GitHub Link */}
			{project.github_link && (
				<div className="px-4 pb-4">
					<a
						href={project.github_link}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-400 text-sm hover:underline inline-block mt-1 break-all">
						View on GitHub ↗
					</a>
				</div>
			)}
		</div>
	);
};

export default ProjectCard;
