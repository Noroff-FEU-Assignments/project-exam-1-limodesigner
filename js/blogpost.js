// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { updateCopyrightYear } from "./currentyear.js";

document.addEventListener("DOMContentLoaded", function () {
  const postTitle = document.querySelector("#blog-header__title");
  const postDate = document.querySelector(".post-date");
  const postMedia = document.querySelector(".post-media");
  const postText = document.querySelector(".post-text");

  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  const postUrl = `https://sweetheartembroidery.com/wp-json/wp/v2/posts/${id}?_embed`;

  showLoader();

  fetch(postUrl)
    .then((response) => response.json())
    .then((data) => {
      document.title = "Sweetheart Embroidery | " + data.title.rendered;
      postTitle.textContent = data.title.rendered;
      postDate.textContent = `Published on ${new Date(
        data.date
      ).toLocaleDateString()}`;

      // Check if 'wp:featuredmedia' exists in the data
      if (data._embedded && data._embedded["wp:featuredmedia"]) {
        const imageInfo = data._embedded["wp:featuredmedia"][0];
        if (imageInfo.source_url) {
          const featuredImage = document.createElement("img");
          featuredImage.classList.add("post-image");
          featuredImage.setAttribute("src", imageInfo.source_url);
          featuredImage.setAttribute("alt", "Featured Image");
          postMedia.appendChild(featuredImage);
        }
      }

      postText.innerHTML = data.content.rendered;

      hideLoader();
    })
    .catch((error) => {
      console.error("Error fetching blogpost:", error);

      // Hide the loader in case of an error
      hideLoader();
    });

  // Function to fetch and display specific blog posts in cards
  async function fetchBlogPostById(postId) {
    try {
      const response = await fetch(
        `https://sweetheartembroidery.com/wp-json/wp/v2/posts/${postId}?_embed`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch blog post: ${response.status} - ${response.statusText}`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function displayBlogCard(postId, containerId) {
    const post = await fetchBlogPostById(postId);
    if (post) {
      const container = document.getElementById(containerId);

      // Create a new div element for the card
      const cardDiv = document.createElement("div");
      cardDiv.classList.add(".blog-card-background");

      // Check if featured media exists and add the image
      if (post._embedded && post._embedded["wp:featuredmedia"]) {
        const featuredMedia = post._embedded["wp:featuredmedia"][0];
        if (featuredMedia && featuredMedia.source_url) {
          const imageDiv = document.createElement("div");
          imageDiv.classList.add("blog-card-image");
          const image = document.createElement("img");
          image.src = featuredMedia.source_url;
          image.alt = post.title.rendered;
          imageDiv.appendChild(image);
          cardDiv.appendChild(imageDiv);
        }
      }

      // Create a div for the card content
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("blog-card-content");

      // Populate the card content
      contentDiv.innerHTML = `
      <h2>${post.title.rendered}</h2>
      <p>${new Date(post.date).toLocaleDateString()}</p>
      <p>${post.excerpt.rendered}</p>
      <a class="blog-button flex" href="blog.html?id=${post.id}">Read more</a>
    `;

      // Append the content div to the card div
      cardDiv.appendChild(contentDiv);

      // Append the card div to the specified container
      container.appendChild(cardDiv);
    }
  }

  // Display specific blog posts in cards
  displayBlogCard(340, "blogCard340");
  displayBlogCard(350, "blogCard350");
  displayBlogCard(358, "blogCard358");

  updateCopyrightYear();
});
