// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { apiEndpoint } from "./constants/api.js";

const apiPosts = `${apiEndpoint}posts`;

export async function fetchBlogPosts(page = 1, perPage = 10) {
	try {
		showLoader();
		const response = await fetch(`${apiPosts}?page=${page}&per_page=${perPage}&_embed`);

		if (!response.ok) {
			throw new Error(`Failed to fetch blog posts: ${response.status} - ${response.statusText}`);
		}

		const totalPages = Number(response.headers.get("x-wp-totalpages"));

		const data = await response.json();
		return { data, totalPages };
	} catch (error) {
		console.error(error);
		return { error };
	}
}
