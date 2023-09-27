// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { updateCopyrightYear } from "./currentyear.js";

document.addEventListener("DOMContentLoaded", function () {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  const blogPostContent = document.querySelector(".blog-content");

  const postUrl = `https://sweetheartembroidery.com/wp-json/wp/v2/posts/${id}?_embed`;

  showLoader();

  fetch(postUrl)
    .then((response) => response.json())
    .then((data) => {
      //fetch doc title
      document.title = "Sweetheart Embroidery | " + data.title.rendered;

      const contentRendered = `
      <h2 class="blog-header__title">${data.title.rendered}</h2>
      <div class="blog-images">${data.content.rendered}</div>
      <p>Published on ${new Date(data.date).toLocaleDateString()}</p>
      `;

      if (data._embedded && data._embedded["wp:featuredmedia"]) {
        const showImage = data._embedded["wp:featuredmedia"][0];
        if (showImage.source_url) {
          const featuredImage = document.createElement("img");
          featuredImage.classList.add("post-image");
          featuredImage.setAttribute("src", showImage.source_url);
          featuredImage.setAttribute("alt", "Featured Image");
          postMedia.appendChild(featuredImage);
        }
      }

      contentRendered.innerHTML = blogPostContent;

      const modalContainer = document.querySelector(".image-modal__page");
      const modalImage = document.querySelector(".image-modal");

      const showImage = () => {
        modalContainer.style.display = "block";
      };

      modalImage.onclick = showImage;

      modalContainer.onclick = function (event) {
        if (event.target == modalContainer) {
          modalContainer.style.display = "none";
        }
      };

      hideLoader();
    })
    .catch((error) => {
      console.error("Error fetching blogpost", error);

      hideLoader();
    });

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

      const figures = document.querySelectorAll("figure");
      figures.forEach((figure) => {
        figure.addEventListener("click", (event) => {
          showImageModal(figure.querySelector("img"));
        });
      });

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

  function showImageModal(image) {
    const modal = document.querySelector(".image-modal");
    modal.classList.add("show");

    const modalBackdrop = document.createElement("div");
    modalBackdrop.classList.add("modal-backdrop");
    modal.appendChild(modalBackdrop);

    const modalBody = document.querySelector(".image-modal__page");
    const modalImage = document.createElement("img");
    modalImage.src = image.src;
    modalBody.append(modalImage);

    modalBackdrop.addEventListener("click", () => {
      modalBody.innerHTML = "";
      modal.classList.remove("show");
    });

    modal.addEventListener("click", (event) => {
      // Prevent clicks inside the modal from closing it
      event.stopPropagation();
    });
  }

  // Close the modal when clicking anywhere on the document
  document.addEventListener("click", (event) => {
    const modal = document.querySelector(".image-modal");
    if (event.target === modal) {
      const modalBody = document.querySelector(".image-modal__page");
      modalBody.innerHTML = "";
      modal.classList.remove("show");
    }
  });

  displayBlogCard(340, "blogCard340");
  displayBlogCard(350, "blogCard350");
  displayBlogCard(358, "blogCard358");

  updateCopyrightYear();
});
