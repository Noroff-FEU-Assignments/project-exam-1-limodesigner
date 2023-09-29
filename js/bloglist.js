// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { fetchBlogPosts } from "./api.js";
import { updateCopyrightYear } from "./currentyear.js";
import { renderPosts } from "./ui/posts/renderPosts.js";
import { displayMessage } from "./ui/common/displayMessage.js";

const postsPerPage = 10;
let currentPage = 1;

async function displayBlogPosts() {
  showLoader();

  const blogPostsContainer = document.getElementById("blog-posts-all");
  const {
    data: posts,
    totalPages,
    error,
  } = await fetchBlogPosts(currentPage, postsPerPage);

  if (error) {
    console.error("Error fetching blog posts:", error.message);
    hideLoader();
    document.getElementById("load-more").style.display = "none";
    return displayMessage(error.message, "error", blogPostsContainer);
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  hideLoader();

  renderPosts(posts, blogPostsContainer);

  if (totalPages === currentPage) {
    document.getElementById("load-more").style.display = "none";
  }

  currentPage++;

  if (totalPages === currentPage) {
    document.getElementById("load-more").classList.add("hide-button");
  } else {
    document.getElementById("load-more").classList.remove("hide-button");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayBlogPosts();

  const loadMoreButton = document.getElementById("load-more");

  loadMoreButton.addEventListener("click", async () => {
    displayBlogPosts();
  });
});

updateCopyrightYear();
