// src/components/EditProfile.jsx
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
				"https://orbital-signal-457502-f2.et.r.appspot.com/api/upload",
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
			"https://orbital-signal-457502-f2.et.r.appspot.com/api/auth/update-profile",
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
		<div className="min-h-screen flex items-center justify-center bg-gray-900">
			<div className="bg-white/10 p-6 rounded-xl shadow-xl w-full max-w-md">
				<div className="text-center mb-4">
					<img
						src={
							formData.profilePhoto
								? URL.createObjectURL(formData.profilePhoto)
								: formData.profilePhotoURL || "https://i.pravatar.cc/100"
						}
						alt="Profile"
						className="w-24 h-24 rounded-full mx-auto object-cover"
					/>
					<input
						type="file"
						onChange={handleFileChange}
						className="mt-2 block w-full text-sm text-gray-400"
					/>
				</div>
				<form onSubmit={handleSave}>
					<InputField name="username" label="Username" value={formData.username} onChange={handleChange} />
					<InputField name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
					<div className="flex justify-between mt-6">
						<button type="button" onClick={() => navigate("/profile")} className="px-4 py-2 bg-gray-400 rounded-full">Cancel</button>
						<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-full">Save</button>
					</div>
				</form>
			</div>
		</div>
	);
};

const InputField = ({ label, ...props }) => (
	<div className="mb-4">
		<label className="block mb-1 text-sm text-white">{label}</label>
		<input {...props} className="w-full p-2 rounded-md bg-gray-100" />
	</div>
);

export default EditProfile;
