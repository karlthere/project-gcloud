/** @format */
import { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import LayoutOne from "./layout/LayoutOne";
import ProjectList from "./components/ProjectList";
import ProjectDetail from "./components/ProjectDetail";
import AddProject from "./components/AddProject";
import EditProject from "./components/EditProject";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import ChangePassword from "./components/ChangePassword";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : null;
	});

	const [projects, setProjects] = useState([]);

	useEffect(() => {
		const fetchProjects = async () => {
			if (!user?.id) return;
			try {
				const res = await fetch(`${API_URL}/api/projects/${user.id}`, {
					headers: {
						"Content-Type": "application/json",
						"x-api-key": API_KEY,
					},
				});
				if (!res.ok) throw new Error("Failed to fetch projects");
				const data = await res.json();
				setProjects(data);
			} catch (err) {
				console.error("Project fetch error:", err);
			}
		};

		fetchProjects();
	}, [user]);

	const updateUser = (newUser) => {
		setUser(newUser);
		localStorage.setItem("user", JSON.stringify(newUser));
	};

	const handleDeleteProject = async (projectId) => {
		try {
			const res = await fetch(`${API_URL}/api/projects/${projectId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"x-api-key": API_KEY,
				},
			});
			if (!res.ok) throw new Error("Delete failed");

			alert("Project deleted successfully!");
			setProjects((prev) => prev.filter((p) => p.id !== projectId));
			window.location.href = "/projects";
		} catch (err) {
			console.error("Delete error:", err);
			alert("Error deleting project");
		}
	};

	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login setUser={setUser} />} />
				<Route path="/register" element={<Register setUser={setUser} />} />

				<Route
					path="/"
					element={
						<PrivateRoute user={user}>
							<LayoutOne setUser={setUser} />
						</PrivateRoute>
					}>
					<Route index element={<Navigate to="/dashboard" />} />
					<Route
						path="dashboard"
						element={<Dashboard user={user} projects={projects} />}
					/>
					<Route path="projects" element={<ProjectList user={user} />} />
					<Route
						path="projects/:id"
						element={
							<ProjectDetail user={user} onDelete={handleDeleteProject} />
						}
					/>
					<Route path="add-project" element={<AddProject user={user} />} />
					<Route
						path="projects/edit/:id"
						element={<EditProject user={user} />}
					/>
					<Route path="profile" element={<Profile user={user} />} />
					<Route
						path="profile/edit"
						element={<EditProfile user={user} updateUser={updateUser} />}
					/>
					<Route path="profile/change-password" element={<ChangePassword />} />
				</Route>

				{/* Optional: Not found route */}
				<Route path="*" element={<Navigate to="/dashboard" />} />
			</Routes>
		</Router>
	);
};

export default App;
