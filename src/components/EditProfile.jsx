/** @format */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user, updateUser }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		profilePhoto: null,
		profilePhotoURL: "",
	});

	useEffect(() => {
		const storedUser = user || JSON.parse(localStorage.getItem("user"));
		if (storedUser) {
			setFormData((prev) => ({
				...prev,
				username: storedUser.username || "",
				email: storedUser.email || "",
				profilePhotoURL: storedUser.profile_image || "",
			}));
		}
	}, [user]);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFormData((prev) => ({
			...prev,
			profilePhoto: file,
		}));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = async (e) => {
		e.preventDefault();
		const storedUser = JSON.parse(localStorage.getItem("user"));
		if (!storedUser || !storedUser.id) return alert("User not logged in.");

		let imageUrl = formData.profilePhotoURL;

		if (formData.profilePhoto) {
			const uploadForm = new FormData();
			uploadForm.append("image", formData.profilePhoto);

			const uploadRes = await fetch(
				`${import.meta.env.VITE_API_URL}/api/upload`,
				{
					method: "POST",
					headers: {
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					body: uploadForm,
				}
			);
			const uploadData = await uploadRes.json();
			imageUrl = uploadData.image_url;
		}

		const payload = {
			id: storedUser.id,
			username: formData.username,
			email: formData.email,
			profile_image: imageUrl,
		};

		const res = await fetch(
			`${import.meta.env.VITE_API_URL}/api/auth/update-profile`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": import.meta.env.VITE_API_KEY,
				},
				body: JSON.stringify(payload),
			}
		);

		const data = await res.json();
		if (!res.ok) return alert(data.message || "Update failed");

		const updatedUser = { ...storedUser, ...payload };
		localStorage.setItem("user", JSON.stringify(updatedUser));
		updateUser(updatedUser);
		alert("Profile updated!");
		navigate("/profile");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
			<div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl shadow-xl w-full max-w-md text-white space-y-6">
				{/* Profile Image */}
				<div className="text-center">
					<div className="w-24 h-24 aspect-square mx-auto rounded-full overflow-hidden border-4 border-white/20 mb-3">
						<img
							src={
								formData.profilePhoto
									? URL.createObjectURL(formData.profilePhoto)
									: formData.profilePhotoURL || "https://i.pravatar.cc/100"
							}
							alt="Profile"
							className="w-full h-full object-cover"
						/>
					</div>
					<input
						type="file"
						accept="image/*"
						onChange={handleFileChange}
						className="block w-full text-sm text-gray-300 file:text-white file:bg-blue-600 file:px-4 file:py-2 file:rounded-full file:border-0 hover:file:bg-blue-700"
					/>
				</div>

				{/* Form */}
				<form onSubmit={handleSave} className="space-y-4">
					<InputField
						name="username"
						label="Username"
						value={formData.username}
						onChange={handleChange}
					/>
					<InputField
						name="email"
						type="email"
						label="Email"
						value={formData.email}
						onChange={handleChange}
					/>

					{/* Buttons */}
					<div className="flex flex-col sm:flex-row justify-between gap-4 pt-2">
						<button
							type="button"
							onClick={() => navigate("/profile")}
							className="w-full sm:w-1/2 py-2 bg-white/10 hover:bg-white/20 text-gray-200 rounded-md">
							Cancel
						</button>
						<button
							type="submit"
							className="w-full sm:w-1/2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

// Reusable Input Field
const InputField = ({ label, ...props }) => (
	<div>
		<label className="block mb-1 text-sm font-semibold capitalize">
			{label}
		</label>
		<input
			{...props}
			className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
		/>
	</div>
);

export default EditProfile;
