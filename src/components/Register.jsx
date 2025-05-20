/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setUser }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.username || !formData.email || !formData.password) {
			alert("All fields are required");
			return;
		}

		if (formData.password.length < 6) {
			alert("Password must be at least 6 characters");
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		try {
			const response = await fetch(
				"https://orbital-signal-457502-f2.et.r.appspot.com/api/auth/register",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					body: JSON.stringify({
						username: formData.username.trim(),
						email: formData.email.trim().toLowerCase(),
						password: formData.password,
					}),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				alert(data.error || "Registration failed");
				return;
			}

			setUser(data);
			localStorage.setItem("user", JSON.stringify(data));
			navigate("/dashboard");
		} catch (error) {
			alert("Server error. Make sure backend is running.");
			console.error("Register error:", error);
		}
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			{/* LEFT - Illustration (hidden on mobile) */}
			<div className="hidden md:flex md:w-1/2 h-64 md:h-auto">
				<img
					src="/login.png"
					alt="DevPath Illustration"
					className="w-full h-full object-cover"
				/>
			</div>

			{/* RIGHT - Form */}
			<div className="flex-1 flex items-center justify-center bg-gray-900 px-6 py-10 md:py-0">
				<div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur-md shadow-xl">
					<h2 className="text-3xl font-bold mb-2 text-blue-400">
						Create Your Account
					</h2>
					<p className="text-gray-300 mb-6 text-sm">
						Join DevPath and manage your coding projects easily.
					</p>

					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="text"
							name="username"
							placeholder="Username"
							value={formData.username}
							onChange={handleChange}
							required
							className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
							required
							className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							required
							className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
						/>
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
							className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
						/>

						<button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-md font-semibold transition">
							Register
						</button>
					</form>

					<p className="text-sm text-center mt-6 text-gray-400">
						Already have an account?{" "}
						<a href="/login" className="text-blue-400 hover:underline">
							Log in
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
