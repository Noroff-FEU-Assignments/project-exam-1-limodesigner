// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { displayBlogCard } from "./main.js";
import { updateCopyrightYear } from "./currentyear.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const blogPostContent = document.querySelector(".blog-content");

const postUrl = `https://sweetheartembroidery.com/wp-json/wp/v2/posts/${id}?_embed`;

function displayBlogPost(blogData) {
  const blogPostContainer = document.createElement("div");
  blogPostContainer.classList.add("blog-post-wrapper");

  const titleElement = document.createElement("h1");
  titleElement.classList.add("blog-header__title");
  titleElement.innerHTML = blogData.title.rendered;

  const dateElement = document.createElement("p");
  dateElement.classList.add("blog-date");
  dateElement.innerHTML = `Published on: ${new Date(
    blogData.date
  ).toLocaleDateString()}`;

  const featuredImageElement = document.createElement("img");
  featuredImageElement.classList.add("blog-featured-image");
  featuredImageElement.src =
    blogData._embedded["wp:featuredmedia"][0].source_url;

  const textContentDiv = document.createElement("div");
  textContentDiv.classList.add("blog-text-content");
  textContentDiv.innerHTML = blogData.content.rendered;

  blogPostContainer.appendChild(titleElement);
  blogPostContainer.appendChild(dateElement);
  blogPostContainer.appendChild(featuredImageElement);
  blogPostContainer.appendChild(textContentDiv);

  blogPostContent.appendChild(blogPostContainer);
}

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModalButton = document.querySelector(".close");

function openModal(imageSrc) {
  modal.style.display = "block";
  modalImage.src = imageSrc;
}

function closeModal() {
  modal.style.display = "none";
}

document.querySelector(".blog-content").addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    openModal(e.target.src);
  }
});

closeModalButton.addEventListener("click", closeModal);

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

async function fetchBlogPost() {
  try {
    showLoader();

    const response = await fetch(postUrl);

    if (!response.ok) {
      throw new Error(`Error fetching blog post. Status: ${response.status}`);
    }

    const blogData = await response.json();

    displayBlogPost(blogData);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  } finally {
    hideLoader();
  }
}

fetchBlogPost();

displayBlogCard(340, "blogCard340");
displayBlogCard(350, "blogCard350");
displayBlogCard(358, "blogCard358");

updateCopyrightYear();
