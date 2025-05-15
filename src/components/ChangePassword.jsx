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
				"http://localhost:5001/api/auth/change-password",
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
		<div className="min-h-screen bg-gray-900 flex justify-center items-center px-4">
			<div className="max-w-md w-full bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl text-white">
				<h2 className="text-2xl font-bold text-center mb-6">
					🔒 Change Password
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-semibold mb-1">
							Current Password
						</label>
						<input
							type="password"
							name="oldPassword"
							value={formData.oldPassword}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none"
						/>
					</div>

					<div>
						<label className="block text-sm font-semibold mb-1">
							New Password
						</label>
						<input
							type="password"
							name="newPassword"
							value={formData.newPassword}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none"
						/>
					</div>

					<div>
						<label className="block text-sm font-semibold mb-1">
							Confirm New Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none"
						/>
					</div>

					<div className="flex justify-between mt-6 gap-4">
						<button
							type="button"
							onClick={() => navigate("/profile")}
							className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-full">
							Cancel
						</button>
						<button
							type="submit"
							className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
							Save Password
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ChangePassword;
