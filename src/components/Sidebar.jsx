/** @format */

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	FaHome,
	FaProjectDiagram,
	FaUserAlt,
	FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ setUser, isOpen, toggleSidebar }) => {
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
		localStorage.removeItem("user");
		if (setUser) setUser(null);
		navigate("/login");
	};

	// Auto-close sidebar when a link is clicked (on mobile only)
	const handleLinkClick = () => {
		if (window.innerWidth < 768) {
			toggleSidebar();
		}
	};

	return (
		<div
			className={`${
				isOpen ? "block" : "hidden"
			} md:block fixed top-0 left-0 w-64 bg-gray-900 text-white p-6 h-full z-50`}>
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

			<ul className="flex flex-col space-y-3">
				<li>
					<Link
						to="/dashboard"
						className={linkClass("/dashboard")}
						onClick={handleLinkClick}>
						<FaHome className="text-xl" />
						<span>Dashboard</span>
					</Link>
				</li>
				<li>
					<Link
						to="/projects"
						className={linkClass("/projects")}
						onClick={handleLinkClick}>
						<FaProjectDiagram className="text-xl" />
						<span>Project</span>
					</Link>
				</li>
				<li>
					<Link
						to="/profile"
						className={linkClass("/profile")}
						onClick={handleLinkClick}>
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
