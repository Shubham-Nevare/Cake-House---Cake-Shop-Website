"use client";

import { useState } from 'react';

const SearchFilter = ({ onSearch }) => {
	const [q, setQ] = useState('');

	function submit(e) {
		e.preventDefault();
		if (onSearch) onSearch(q);
	}

	return (
		<form onSubmit={submit} className="flex items-center gap-2 flex-1">
			<input
				aria-label="Search cakes"
				value={q}
				onChange={(e) => setQ(e.target.value)}
				placeholder="Search cakes, categories..."
				className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pastel-pink"
			/>
			<button type="submit" className="bg-pastel-pink text-chocolate-brown px-4 py-2 rounded-lg cursor-pointer">Search</button>
		</form>
	);
};

export default SearchFilter;
