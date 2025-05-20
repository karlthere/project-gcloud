/** @format */

// src/hooks/useProjects.js

import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const useProjects = (userId) => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProjects = async () => {
			if (!userId) return;

			try {
				const response = await fetch(`${API_URL}/api/projects/${userId}`, {
					headers: {
						"Content-Type": "application/json",
						"x-api-key": API_KEY,
					},
				});

				if (!response.ok) throw new Error("Gagal ambil data");

				const data = await response.json();
				setProjects(data);
			} catch (err) {
				console.error("Error loading projects:", err);
				setProjects([]); // fallback jika gagal
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, [userId]);

	return { projects, loading };
};

export default useProjects;
