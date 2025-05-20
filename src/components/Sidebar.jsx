/** @format */

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	FaHome,
	FaProjectDiagram,
	FaUsers,
	FaUserAlt,
	FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ setUser }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const isActive = (path) => location.pathname === path;

	const linkClass = (path) =>
		`flex items-center space-x-4 px-3 py-2 rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
			isActive(path)
				? "bg-white/10 text-blue-400 font-semibold"
				: "text-white hover:text-blue-300"
		}`;

	const handleLogout = () => {
		localStorage.removeItem("user"); // Hapus data dari localStorage
		if (setUser) setUser(null); // Jika disediakan, hapus dari state
		navigate("/login");
	};

	return (
		<div className="fixed top-0 left-0 w-64 bg-gray-900 text-white p-6 h-full">
			{/* Logo */}
			<div className="flex items-center mb-8">
				<div className="w-32 h-16 flex items-center justify-center">
					<img
						src="/logo.png"
						alt="Logo"
						className="w-full h-full object-contain"
					/>
				</div>
			</div>

			{/* Sidebar Links */}
			<ul className="flex flex-col space-y-3">
				<li>
					<Link to="/dashboard" className={linkClass("/dashboard")}>
						<FaHome className="text-xl" />
						<span>Dashboard</span>
					</Link>
				</li>
				<li>
					<Link to="/projects" className={linkClass("/projects")}>
						<FaProjectDiagram className="text-xl" />
						<span>Project</span>
					</Link>
				</li>
				{/* <li>
					<Link to="/collaborations" className={linkClass("/collaborations")}>
						<FaUsers className="text-xl" />
						<span>Kolaborasi</span>
					</Link>
				</li> */}
				<li>
					<Link to="/profile" className={linkClass("/profile")}>
						<FaUserAlt className="text-xl" />
						<span>Profil</span>
					</Link>
				</li>
				<li>
					<button
						onClick={handleLogout}
						className="flex items-center space-x-4 px-3 py-2 text-white hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 w-full text-left rounded-lg">
						<FaSignOutAlt className="text-xl" />
						<span>Logout</span>
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
