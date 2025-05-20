/** @format */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = ({ user }) => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		if (user) {
			setUserData(user);
		} else {
			const stored = JSON.parse(localStorage.getItem("user"));
			if (stored) setUserData(stored);
		}
	}, [user]);

	if (!userData) {
		return <p className="text-white text-center mt-10">Loading profile...</p>;
	}

	return (
		<div className="bg-gray-900 min-h-screen flex items-center justify-center px-4">
			<div className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full text-white">
				{/* Profile Image and Header */}
				<div className="text-center mb-6">
					<div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
						<img
							src={userData.profile_image}
							alt={userData.username}
							className="w-full h-full object-cover"
						/>
					</div>
					<h2 className="text-2xl font-bold">{userData.username}</h2>
					<p className="text-gray-400 text-sm">{userData.email}</p>
				</div>

				{/* Profile Info */}
				<div className="space-y-4 text-sm text-gray-300">
					<div className="flex justify-between">
						<span>Username</span>
						<span>{userData.username}</span>
					</div>
					<div className="flex justify-between">
						<span>Email</span>
						<span>{userData.email}</span>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-4 mt-6">
					<button
						onClick={() => navigate("/profile/edit")}
						className="flex-1 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
						Edit Profile
					</button>
					<button
						onClick={() => navigate("/profile/change-password")}
						className="flex-1 py-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 text-sm font-medium">
						Change Password
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
