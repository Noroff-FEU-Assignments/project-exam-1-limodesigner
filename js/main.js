// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./ui/common/loader.js";
import { displayBlogCard } from "./ui/posts/blogpostbyid.js";
import { updateCopyrightYear } from "./constants/currentyear.js";
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

displayBlogCard(315, "blogCard315");
displayBlogCard(308, "blogCard308");

updateCopyrightYear();
