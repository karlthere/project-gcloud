/** @format */

// hooks/useProjects.js
import { useEffect, useState } from "react";

const useProjects = (userId) => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			if (!userId) return;

			try {
				const res = await fetch(`http://localhost:5001/api/projects/${userId}`);
				const data = await res.json();
				setProjects(data);
			} catch (err) {
				console.error("Failed to fetch projects:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, [userId]);

	return { projects, loading };
};

export default useProjects;
