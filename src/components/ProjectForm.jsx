/** @format */
import { useState } from "react";

const ProjectForm = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		level: "beginner",
		focus: "frontend",
		programming_language: "",
		image_url: "",
		github_link: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
			<form
				onSubmit={handleSubmit}
				className="space-y-5 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg text-white">
				<h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
					🛠 Add New Project
				</h2>

				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					placeholder="Project Title"
					className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>

				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					placeholder="Project Description"
					rows="3"
					className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>

				<select
					name="level"
					value={formData.level}
					onChange={handleChange}
					className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
					<option value="beginner">Beginner</option>
					<option value="intermediate">Intermediate</option>
					<option value="advanced">Advanced</option>
				</select>

				<select
					name="focus"
					value={formData.focus}
					onChange={handleChange}
					className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
					<option value="frontend">Frontend</option>
					<option value="backend">Backend</option>
					<option value="fullstack">Fullstack</option>
				</select>

				<input
					type="text"
					name="programming_language"
					value={formData.programming_language}
					onChange={handleChange}
					placeholder="Programming Language"
					className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>

				<input
					type="url"
					name="github_link"
					value={formData.github_link}
					onChange={handleChange}
					placeholder="GitHub Link"
					className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>

				<button
					type="submit"
					className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
					Save Project
				</button>
			</form>
		</div>
	);
};

export default ProjectForm;
