// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { fetchBlogPosts } from "./api.js";
import { updateCopyrightYear } from "./currentyear.js";

const postsPerPage = 10;
let currentPage = 1;
let allPostsFetched = false; // Track whether all posts have been fetched

async function displayBlogPosts() {
  try {
    showLoader();

    const blogPostsContainer = document.getElementById("blog-posts-all");
    const posts = await fetchBlogPosts(currentPage, postsPerPage);

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    hideLoader();

    if (posts.length === 0) {
      document.getElementById("load-more").style.display = "none";
      allPostsFetched = true;
      console.log(`No more posts to fetch. Current Page: ${currentPage}`);
      return;
    }

    for (const post of posts) {
      const postContainer = document.createElement("li");
      postContainer.classList.add("blog-post");

      const titleElement = document.createElement("h2");
      titleElement.classList.add("post-title");
      titleElement.textContent = post.title.rendered;

      if (post._embedded && post._embedded["wp:featuredmedia"]) {
        const imageUrl = post._embedded["wp:featuredmedia"][0].source_url;
        const imageElement = document.createElement("img");
        imageElement.classList.add("post-image");
        imageElement.src = imageUrl;
        postContainer.appendChild(imageElement);
      }

      const descriptionElement = document.createElement("p");
      descriptionElement.classList.add("post-excerpt");

      const apiContent = post.content.rendered;
      const parser = new DOMParser();
      const parsedContent = parser.parseFromString(apiContent, "text/html");
      const truncatedExcerpt = parsedContent.body.textContent.substring(0, 200);

      descriptionElement.textContent = truncatedExcerpt + "...";

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("blog-button-container");

      const readMoreButton = document.createElement("a");
      readMoreButton.classList.add("blog-button");
      readMoreButton.textContent = "Read";
      readMoreButton.href = `blog.html?id=${post.id}`;

      const readMoreParagraph = document.createElement("p");
      readMoreParagraph.appendChild(readMoreButton);

      buttonContainer.appendChild(readMoreParagraph);
      postContainer.appendChild(titleElement);
      postContainer.appendChild(descriptionElement);
      postContainer.appendChild(buttonContainer);
      blogPostsContainer.appendChild(postContainer);
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error.message);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  displayBlogPosts();

  const loadMoreButton = document.getElementById("load-more");
  loadMoreButton.addEventListener("click", async () => {
    if (!allPostsFetched) {
      currentPage++;
      console.log(`Load more button clicked. Current Page: ${currentPage}`);
      const posts = await displayBlogPosts();

      if (posts === null) {
        // Hide the "Load more" button if there are no more posts
        loadMoreButton.style.display = "none";
      }
    }
  });
});

updateCopyrightYear();
