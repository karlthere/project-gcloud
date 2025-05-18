/** @format */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user, updateUser }) => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		profilePhoto: null,
	});

	useEffect(() => {
		const storedUser = user || JSON.parse(localStorage.getItem("user"));
		if (storedUser) {
			setFormData((prev) => ({
				...prev,
				username: storedUser.username || "",
				email: storedUser.email || "",
			}));
		}
	}, [user]);

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
			profilePhoto: file,
		}));
	};

	const handleSave = async (e) => {
		e.preventDefault();

		const storedUser = JSON.parse(localStorage.getItem("user"));
		if (!storedUser || !storedUser.id) {
			alert("User not logged in.");
			return;
		}

		const payload = {
			id: storedUser.id,
			username: formData.username,
			email: formData.email,
		};

		try {
			// const res = await fetch("http://localhost:5001/api/auth/update-profile", {
			const res = await fetch("https://orbital-signal-457502-f2.et.r.appspot.com/api/auth/update-profile", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const data = await res.json();

			if (!res.ok) {
				alert(data.message || "Failed to update profile.");
				return;
			}

			const updatedUser = { ...storedUser, ...payload };
			localStorage.setItem("user", JSON.stringify(updatedUser));
			updateUser(updatedUser);
			alert("Profile updated successfully.");
			navigate("/profile");
		} catch (error) {
			console.error("Update error:", error);
			alert("Server error. Try again later.");
		}
	};

	const handleCancel = () => {
		navigate("/profile");
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-light-blue to-dark-blue">
			<div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
				{/* Profile Image */}
				<div className="text-center mb-6">
					<div className="rounded-full w-24 h-24 mx-auto mb-4 bg-gray-300 overflow-hidden">
						<img
							src={
								formData.profilePhoto
									? URL.createObjectURL(formData.profilePhoto)
									: "https://i.pravatar.cc/100?img=3"
							}
							alt="Profile"
							className="w-full h-full object-cover"
						/>
					</div>
					<input
						type="file"
						onChange={handleFileChange}
						className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:rounded-full file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
					/>
				</div>

				<form onSubmit={handleSave}>
					<InputField
						label="Username"
						name="username"
						type="text"
						value={formData.username}
						onChange={handleChange}
					/>
					<InputField
						label="Email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
					/>

					<div className="flex justify-between space-x-4 mt-6">
						<button
							type="button"
							onClick={handleCancel}
							className="px-6 py-3 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400">
							Cancel
						</button>
						<button
							type="submit"
							className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600">
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

// Input field component
const InputField = ({ label, ...props }) => (
	<div className="mt-4">
		<label className="block text-lg font-semibold text-gray-800">{label}</label>
		<input
			{...props}
			className="w-full p-2 mt-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	</div>
);

export default EditProfile;
