/** @format */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProject = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const storedUser = JSON.parse(localStorage.getItem("user"));
				if (!storedUser || !storedUser.id) return;

				const res = await fetch(
					`${import.meta.env.VITE_API_URL}/api/projects/${storedUser.id}`,
					{
						headers: {
							"Content-Type": "application/json",
							"x-api-key": import.meta.env.VITE_API_KEY,
						},
					}
				);
				const data = await res.json();
				const found = data.find((p) => p.id === parseInt(id));
				if (!found) {
					alert("Project not found");
					return navigate("/projects");
				}

				setFormData({
					title: found.title || "",
					category: found.category || "Select",
					difficulty: found.difficulty || "Select",
					status: found.status || "Select",
					tags: found.tags || "",
					image_url: found.image_url || "",
					image: null,
					description: found.description || "",
					githubLink: found.github_link || "",
					references: found.references || "",
				});
			} catch (err) {
				console.error("Failed to fetch project:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData((prev) => ({
			...prev,
			image: file,
		}));
	};

	const uploadImage = async (file) => {
		const formData = new FormData();
		formData.append("image", file);

		const res = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
			method: "POST",
			headers: {
				"x-api-key": import.meta.env.VITE_API_KEY,
			},
			body: formData,
		});

		const data = await res.json();
		return data.image_url;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let imageUrl = formData.image_url;

			if (formData.image) {
				imageUrl = await uploadImage(formData.image);
			}

			const payload = {
				title: formData.title,
				category: formData.category,
				difficulty: formData.difficulty,
				status: formData.status,
				tags: formData.tags,
				image_url: imageUrl,
				description: formData.description,
				github_link: formData.githubLink,
				references: formData.references,
			};

			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/api/projects/${id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					body: JSON.stringify(payload),
				}
			);

			if (!res.ok) throw new Error("Update failed");

			alert("Project updated!");
			navigate(`/projects/${id}`);
		} catch (err) {
			console.error("Update error:", err);
			alert("Failed to update project");
		}
	};

	const handleCancel = () => {
		navigate(`/projects/${id}`);
	};

	if (loading || !formData) {
		return <p className="text-white text-center mt-10">Loading project...</p>;
	}

	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-3xl bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg text-white space-y-6 md:space-y-8">
				<h2 className="text-3xl font-bold text-center">✏️ Edit Project</h2>

				<InputField
					label="Title"
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-4">
					<SelectField
						label="Category"
						name="category"
						value={formData.category}
						onChange={handleChange}
						options={["Select", "Frontend", "Backend", "Fullstack"]}
					/>
					<SelectField
						label="Difficulty"
						name="difficulty"
						value={formData.difficulty}
						onChange={handleChange}
						options={["Select", "Mudah", "Menengah", "Lanjutan"]}
					/>
					<SelectField
						label="Status"
						name="status"
						value={formData.status}
						onChange={handleChange}
						options={["Select", "Belum dikerjakan", "On-Going", "Done"]}
					/>
				</div>

				<InputField
					label="Programming Languages"
					name="tags"
					value={formData.tags}
					onChange={handleChange}
					placeholder="Separate tags by commas"
				/>

				<div>
					<label className="block text-sm font-semibold mb-1 capitalize">
						Image
					</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
					/>
				</div>

				<div>
					<label className="block text-sm font-semibold mb-1 capitalize">
						Description
					</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						rows="4"
						className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
				</div>

				<InputField
					label="GitHub Link"
					type="url"
					name="githubLink"
					value={formData.githubLink}
					onChange={handleChange}
				/>

				<InputField
					label="References"
					name="references"
					value={formData.references}
					onChange={handleChange}
					placeholder="Separate references by commas"
				/>

				<div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
					<button
						type="button"
						onClick={handleCancel}
						className="w-full sm:w-1/2 py-3 bg-white/10 text-gray-300 hover:bg-white/20 rounded-md transition">
						Cancel
					</button>
					<button
						type="submit"
						className="w-full sm:w-1/2 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition">
						Save Changes
					</button>
				</div>
			</form>
		</div>
	);
};

// 🔧 Input Field Component
const InputField = ({ label, ...props }) => (
	<div>
		<label className="block text-sm font-semibold mb-1 capitalize">
			{label}
		</label>
		<input
			{...props}
			className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
		/>
	</div>
);

// 🔧 Select Field Component
const SelectField = ({ label, name, value, onChange, options }) => (
	<div className="relative">
		<label className="block text-sm font-semibold mb-1 capitalize">
			{label}
		</label>
		<select
			name={name}
			value={value}
			onChange={onChange}
			className="w-full px-4 py-3 pr-10 rounded-md bg-white/10 text-white border border-white/20 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
			{options.map((opt) => (
				<option key={opt} value={opt} className="bg-gray-900 text-white">
					{opt}
				</option>
			))}
		</select>
		<div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
			<svg
				className="h-4 w-4 text-white"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor">
				<path
					fillRule="evenodd"
					d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.353a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
					clipRule="evenodd"
				/>
			</svg>
		</div>
	</div>
);

export default EditProject;
