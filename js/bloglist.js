// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./ui/common/loader.js";
import { hideButton, showButton } from "./ui/common/toggleButton.js";
import { fetchBlogPosts } from "./ui/posts/getPosts.js";
import { renderPosts } from "./ui/posts/renderPosts.js";
import { displayMessage } from "./ui/common/displayMessage.js";
import { updateCopyrightYear } from "./constants/currentyear.js";

const postsPerPage = 10;
let currentPage = 1;

async function displayBlogPosts() {
  showLoader();
  hideButton();

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
  showButton();

  renderPosts(posts, blogPostsContainer);

  if (totalPages === currentPage) {
    document.getElementById("load-more").style.display = "none";
  }

  currentPage++;
}

document.addEventListener("DOMContentLoaded", () => {
  displayBlogPosts();

  const loadMoreButton = document.getElementById("load-more");

  loadMoreButton.addEventListener("click", async () => {
    displayBlogPosts();
  });
});

updateCopyrightYear();
