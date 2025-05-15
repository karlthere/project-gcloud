/** @format */

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user, children }) => {
	return user?.email ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
