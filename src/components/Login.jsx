/** @format */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				"https://orbital-signal-457502-f2.et.r.appspot.com/api/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": import.meta.env.VITE_API_KEY,
					},
					body: JSON.stringify({ email, password }),
				}
			);

			const data = await response.json();

			if (!response.ok) {
				alert(data.error || "Login failed");
				return;
			}

			setUser(data);
			localStorage.setItem("user", JSON.stringify(data));
			navigate("/dashboard");
		} catch (err) {
			alert("Server error. Make sure backend is running.");
			console.error(err);
		}
	};

	return (
		<div className="min-h-screen flex flex-col md:flex-row">
			{/* LEFT - Illustration */}
			<div className="hidden md:flex md:w-1/2 h-64 md:h-auto">
				<img
					src="/login.png"
					alt="DevPath Login Illustration"
					className="w-full h-full object-cover"
				/>
			</div>

			{/* RIGHT - Form */}
			<div className="flex-1 flex items-center justify-center bg-gray-900 px-6 py-10 md:py-0">
				<div className="w-full max-w-md p-8 bg-white/5 border border-white/10 rounded-xl text-white backdrop-blur-md shadow-xl">
					<h2 className="text-3xl font-bold mb-2 text-blue-400">
						Welcome Back
					</h2>
					<p className="text-gray-300 mb-6 text-sm">
						Log in to manage your projects in DevPath
					</p>

					<form onSubmit={handleLogin} className="space-y-4">
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
						/>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
						/>

						<button
							type="submit"
							className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-md font-semibold transition">
							Log In
						</button>
					</form>

					<p className="text-sm text-center mt-6 text-gray-400">
						Don't have an account?{" "}
						<a href="/register" className="text-blue-400 hover:underline">
							Register
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
