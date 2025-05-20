/** @format */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		category: "Select",
		difficulty: "Select",
		status: "Select",
		tags: "",
		image: null,
		description: "",
		githubLink: "",
		references: "",
	});

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const storedUser = JSON.parse(localStorage.getItem("user"));
		if (!storedUser || !storedUser.id) {
			alert("User not logged in");
			return;
		}

		// TODO: Optional Upload Image Logic

		const payload = {
			user_id: storedUser.id,
			title: formData.title,
			category: formData.category,
			difficulty: formData.difficulty,
			status: formData.status,
			tags: formData.tags,
			image_url:
				"https://i.pinimg.com/736x/82/a3/3a/82a33a43be59e913b58efbdfd64e281e.jpg", // Replace if using upload
			github_link: formData.githubLink,
			description: formData.description,
			references: formData.references,
		};

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/projects`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					body: JSON.stringify(payload),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				alert(data.message || "Failed to create project");
				return;
			}

			alert("Project created!");
			navigate("/projects");
		} catch (err) {
			console.error("Error creating project:", err);
			alert("Server error while creating project");
		}
	};

	const handleCancel = () => {
		navigate("/projects");
	};

	return (
		<div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-3xl bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg text-white space-y-6">
				<h2 className="text-3xl font-bold text-center">📥 Add New Project</h2>

				<InputField
					label="Title"
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
				/>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-4">
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
					placeholder="Separate tags with commas (e.g. HTML, CSS, JS)"
				/>

				{/* Image Upload */}
				<div>
					<label className="block text-sm font-semibold mb-1">Image</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
					/>
				</div>

				{/* Description */}
				<div>
					<label className="block text-sm font-semibold mb-1">
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
					placeholder="Paste GitHub or deployment link"
				/>

				<InputField
					label="References"
					name="references"
					value={formData.references}
					onChange={handleChange}
					placeholder="Separate links with commas"
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
						Submit Project
					</button>
				</div>
			</form>
		</div>
	);
};

// 🔧 Input Field
const InputField = ({ label, ...props }) => (
	<div>
		<label className="block text-sm font-semibold mb-1">{label}</label>
		<input
			{...props}
			className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
		/>
	</div>
);

// 🔧 Select Field
const SelectField = ({ label, name, value, onChange, options }) => (
	<div className="relative">
		<label className="block text-sm font-semibold mb-1">{label}</label>
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

export default AddProject;
