/** @format */

import Sidebar from "../components/Sidebar"; // Sidebar component
import { Outlet } from "react-router-dom"; // For rendering nested routes

const LayoutOne = () => {
	return (
		<div className="flex min-h-screen bg-white dark:bg-gray-900">
			{/* Sidebar */}
			<Sidebar />

			{/* Main content */}
			<div className="flex-1 p-6 ml-64 overflow-y-auto">
				{/* Render the nested route (based on which route is active) */}
				<Outlet />
			</div>
		</div>
	);
};

export default LayoutOne;
