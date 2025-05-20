/** @format */

// Navbar.jsx
import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => (
	<div className="md:hidden p-4 bg-gray-900 text-white flex justify-between items-center">
		<button onClick={toggleSidebar}>
			<FaBars className="text-2xl" />
		</button>
		<h1 className="text-lg font-semibold">DevPath</h1>
	</div>
);

export default Navbar;
