/** @format */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
	const navigate = useNavigate();
	const [userId, setUserId] = useState(null);

	const [formData, setFormData] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user"));
		if (!storedUser || !storedUser.id) {
			alert("User not logged in.");
			navigate("/login");
		} else {
			setUserId(storedUser.id);
		}
	}, [navigate]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.newPassword !== formData.confirmPassword) {
			alert("New passwords do not match.");
			return;
		}

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/api/auth/change-password`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: userId,
						oldPassword: formData.oldPassword,
						newPassword: formData.newPassword,
					}),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				alert(data.message || "Password change failed.");
				return;
			}

			alert("Password changed successfully.");
			navigate("/profile");
		} catch (err) {
			console.error("Error:", err);
			alert("Server error. Make sure backend is running.");
		}
	};

	return (
		<div className="min-h-screen bg-gray-900 flex justify-center items-center px-4 py-12">
			<div className="max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-xl text-white">
				<h2 className="text-2xl font-bold text-center mb-6">
					🔒 Change Password
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<InputField
						label="Current Password"
						type="password"
						name="oldPassword"
						value={formData.oldPassword}
						onChange={handleChange}
						required
					/>
					<InputField
						label="New Password"
						type="password"
						name="newPassword"
						value={formData.newPassword}
						onChange={handleChange}
						required
						minLength={6}
					/>
					<InputField
						label="Confirm New Password"
						type="password"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>

					<div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
						<button
							type="button"
							onClick={() => navigate("/profile")}
							className="w-full sm:w-1/2 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-md">
							Cancel
						</button>
						<button
							type="submit"
							className="w-full sm:w-1/2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
							Save Password
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

// Reusable Input
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

export default ChangePassword;
