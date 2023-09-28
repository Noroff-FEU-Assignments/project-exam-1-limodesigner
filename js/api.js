// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";

const baseUrl = "https://sweetheartembroidery.com";
const apiEndpoint = "/wp-json/wp/v2/posts";
const apiPosts = baseUrl + apiEndpoint;

export async function fetchBlogPosts(page = 1, perPage = 10) {
  try {
    showLoader();
    const response = await fetch(
      `${apiPosts}?page=${page}&per_page=${perPage}&_embed`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch blog posts: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    hideLoader();
  }
}
