// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { updateCopyrightYear } from "./currentyear.js";

document.addEventListener("DOMContentLoaded", async function () {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  const blogContent = document.querySelector(".blog-content");
  const postUrl = `https://sweetheartembroidery.com/wp-json/wp/v2/posts/${id}?_embed`;

  showLoader();

  try {
    const response = await fetch(postUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch blog post: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();

    // Create and append the title
    const titleElement = document.createElement("h2");
    titleElement.classList.add("blog-header__title");
    titleElement.textContent = data.title.rendered;
    blogContent.appendChild(titleElement);

    // Create and append the publication date
    const dateElement = document.createElement("p");
    dateElement.textContent = `Published on ${new Date(
      data.date
    ).toLocaleDateString()}`;
    blogContent.appendChild(dateElement);

    // Check if featured media exists and add the image
    if (data._embedded && data._embedded["wp:featuredmedia"]) {
      const showImage = data._embedded["wp:featuredmedia"][0];
      if (showImage.source_url) {
        const featuredImage = document.createElement("img");
        featuredImage.classList.add("post-image");
        featuredImage.setAttribute("src", showImage.source_url);
        featuredImage.setAttribute("alt", "Featured Image");
        blogContent.appendChild(featuredImage);

        // Add a click event listener to open the modal
        featuredImage.addEventListener("click", () => {
          openModal(showImage.source_url);
        });
      }
    }

    // Set document title
    document.title = `Sweetheart Embroidery | ${data.title.rendered}`;

    // Create and append the rest of the blog content
    const contentRendered = `
      <div class="blog-images">${data.content.rendered}</div>
    `;

    blogContent.innerHTML += contentRendered;

    hideLoader();
  } catch (error) {
    console.error("Error fetching blog post", error);
    hideLoader();
  }

  // Extra posts for interest
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

      const cardDiv = document.createElement("div");
      cardDiv.classList.add("blog-card-background");

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

      const contentDiv = document.createElement("div");
      contentDiv.classList.add("blog-card-content");

      // Populate the card content
      contentDiv.innerHTML = `
      <h2>${post.title.rendered}</h2>
      <p>${new Date(post.date).toLocaleDateString()}</p>
      <p>${post.excerpt.rendered}</p>
      <a class="blog-button flex" href="blog.html?id=${post.id}">Read more</a>
    `;

      cardDiv.appendChild(contentDiv);
      container.appendChild(cardDiv);
    }
  }

  displayBlogCard(340, "blogCard340");
  displayBlogCard(350, "blogCard350");
  displayBlogCard(358, "blogCard358");

  updateCopyrightYear();
});

// Modal Functionality
function openModal(imageSrc) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <img src="${imageSrc}" alt="Featured Image">
    </div>
  `;

  document.body.appendChild(modal);

  const closeModalButton = modal.querySelector(".close-modal");
  closeModalButton.addEventListener("click", () => {
    closeModal(modal);
  });
}

function closeModal(modal) {
  modal.remove();
}
