// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { fetchBlogPosts } from "./main.js";
import { updateCopyrightYear } from "./currentyear.js";

async function displayBlogPosts() {
  try {
    showLoader();
    setTimeout(hideLoader, 2000);

    const blogPostsContainer = document.getElementById("blog-posts-all");
    const loader = document.getElementById("loader");

    loader.style.display = "block";

    const posts = await fetchBlogPosts();

    loader.style.display = "none";
    blogPostsContainer.classList.remove("hidden");

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    for (const post of posts) {
      const postContainer = document.createElement("div");
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
    console.error("Error:", error);
  }
}

document.addEventListener("DOMContentLoaded", displayBlogPosts);

updateCopyrightYear();
