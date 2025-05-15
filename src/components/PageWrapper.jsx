/** @format */

import React from "react";

const PageWrapper = ({ children }) => {
	return (
		<div className="flex min-h-screen w-full bg-gradient-to-r from-indigo-100 via-blue-200 to-teal-100">
			<div className="w-full flex justify-center items-center p-4">
				<div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 space-y-6">
					{children}
				</div>
			</div>
		</div>
	);
};

export default PageWrapper;
