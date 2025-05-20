/** @format */

import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaBars } from "react-icons/fa";

const LayoutOne = ({ setUser }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setSidebarOpen((prev) => !prev);
	};

	return (
		<div className="min-h-screen flex bg-gray-100 overflow-x-hidden">
			{/* Sidebar */}
			<Sidebar
				isOpen={sidebarOpen}
				toggleSidebar={toggleSidebar}
				setUser={setUser}
			/>

			{/* Main Content */}
			<div className="flex-1 md:ml-64">
				{/* Topbar (mobile only) */}
				<div className="md:hidden bg-gray-900 text-white p-4 flex items-center justify-between">
					<button onClick={toggleSidebar}>
						<FaBars className="text-xl" />
					</button>
					<h1 className="text-lg font-semibold">DevPath</h1>
				</div>

				<main className="p-4">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default LayoutOne;
