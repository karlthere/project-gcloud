/** @format */
import { useEffect, useState } from "react";
import { CheckCircle, Loader2, ClipboardList, Clock } from "lucide-react";

const Dashboard = ({ projects, user }) => {
	const [userProjects, setUserProjects] = useState([]);

	useEffect(() => {
		if (projects && user) {
			const filtered = projects.filter(
				(project) => project.user_id === user.id
			);
			setUserProjects(filtered);
		}
	}, [projects, user]);

	const total = userProjects.length;
	const done = userProjects.filter((p) => p.status === "Done").length;
	const onGoing = userProjects.filter((p) => p.status === "On-Going").length;
	const recentProjects = [...userProjects].slice(0, 3);

	return (
		<div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white transition-all">
			<h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
				👤 Halo, {user?.username}
			</h1>

			{/* Summary Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
				<SummaryCard
					icon={<ClipboardList className="w-5 h-5" />}
					title="Total Projects"
					value={total}
					color="slate"
				/>
				<SummaryCard
					icon={<Loader2 className="w-5 h-5 animate-spin" />}
					title="On-Going"
					value={onGoing}
					color="blue"
				/>
				<SummaryCard
					icon={<CheckCircle className="w-5 h-5" />}
					title="Completed"
					value={done}
					color="green"
				/>
			</div>

			{/* Recent Projects */}
			<div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-sm mb-10">
				<h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
					<Clock className="w-5 h-5" /> Recent Projects
				</h2>
				{recentProjects.length > 0 ? (
					<ul className="space-y-4">
						{recentProjects.map((project) => (
							<li
								key={project.id}
								className="bg-white/10 hover:bg-white/20 border border-white/10 p-4 rounded-lg flex justify-between items-center transition">
								<div>
									<h3 className="text-white font-semibold">{project.title}</h3>
									<p className="text-sm text-gray-300">{project.description}</p>
								</div>
								<StatusBadge status={project.status} />
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-400">You have no recent projects.</p>
				)}
			</div>

			{/* User Info */}
			<div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-sm">
				<h2 className="text-xl font-semibold mb-2">👤 {user?.username}</h2>
				<p className="text-gray-300">Email: {user?.email}</p>
				<p className="mt-2 text-gray-300">
					You have{" "}
					<span className="font-semibold text-indigo-400">
						{userProjects.length}
					</span>{" "}
					project{userProjects.length !== 1 ? "s" : ""} in your workspace.
				</p>
			</div>
		</div>
	);
};

const SummaryCard = ({ icon, title, value, color = "slate" }) => {
	const colorMap = {
		slate: "bg-slate-800/30 text-slate-300",
		blue: "bg-blue-800/30 text-blue-300",
		green: "bg-green-800/30 text-green-300",
	};

	return (
		<div className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-sm">
			<div className="flex items-center space-x-4">
				<div className={`p-2 rounded-full ${colorMap[color] || ""}`}>
					{icon}
				</div>
				<div>
					<h4 className="text-sm text-gray-300">{title}</h4>
					<p className="text-2xl font-bold text-white">{value}</p>
				</div>
			</div>
		</div>
	);
};

const StatusBadge = ({ status }) => {
	const statusMap = {
		Done: "bg-green-500/10 text-green-300",
		"On-Going": "bg-blue-500/10 text-blue-300",
		"Belum dikerjakan": "bg-yellow-500/10 text-yellow-300",
	};

	return (
		<span
			className={`px-3 py-1 text-xs font-medium rounded-full ${
				statusMap[status] || "bg-gray-500/10 text-gray-300"
			}`}>
			{status}
		</span>
	);
};

export default Dashboard;
