// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { displayBlogCard } from "./blogpostbyid.js";
import { updateCopyrightYear } from "./currentyear.js";
import { apiEndpoint } from "./constants/api.js";

const apiPosts = `${apiEndpoint}posts`;

export async function fetchBlogPosts(start = 0, perPage = 10) {
  try {
    showLoader();
    const response = await fetch(
      `${apiPosts}?per_page=${perPage}&offset=${start}&_embed`
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

displayBlogCard(332, "blogCard332");
displayBlogCard(355, "blogCard355");

updateCopyrightYear();
