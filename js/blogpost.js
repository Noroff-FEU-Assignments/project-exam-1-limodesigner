// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { displayBlogCard } from "./main.js";
import { updateCopyrightYear } from "./currentyear.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const blogPostContent = document.querySelector(".blog-content");

const postUrl = `https://sweetheartembroidery.com/wp-json/wp/v2/posts/${id}?_embed`;

// Function to display the fetched blog post content
function displayBlogPost(blogData) {
  // Create a container div for the entire blog post
  const blogPostContainer = document.createElement("div");
  blogPostContainer.classList.add("blog-post-wrapper");

  // Create a title element with a CSS class
  const titleElement = document.createElement("h1");
  titleElement.classList.add("blog-header__title");
  titleElement.innerHTML = blogData.title.rendered;

  // Create a date element with a CSS class
  const dateElement = document.createElement("p");
  dateElement.classList.add("blog-date");
  dateElement.innerHTML = `Published on: ${new Date(
    blogData.date
  ).toLocaleDateString()}`;

  // Create an image element for the featured image with a CSS class
  const featuredImageElement = document.createElement("img");
  featuredImageElement.classList.add("blog-featured-image");
  featuredImageElement.src =
    blogData._embedded["wp:featuredmedia"][0].source_url;

  // Create a div for the blog post text content with a CSS class
  const textContentDiv = document.createElement("div");
  textContentDiv.classList.add("blog-text-content");
  textContentDiv.innerHTML = blogData.content.rendered;

  // Append the elements to the container in the desired order
  blogPostContainer.appendChild(titleElement);
  blogPostContainer.appendChild(dateElement);
  blogPostContainer.appendChild(featuredImageElement);
  blogPostContainer.appendChild(textContentDiv);

  // Append the entire container to the blogPostContent element
  blogPostContent.appendChild(blogPostContainer);
}

// Get references to modal elements
const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModalButton = document.querySelector(".close");

// Function to open the modal and display the clicked image
function openModal(imageSrc) {
  modal.style.display = "block";
  modalImage.src = imageSrc;
}

// Function to close the modal
function closeModal() {
  modal.style.display = "none";
}

// Event listener for clicking on an image in the blog post
document.querySelector(".blog-content").addEventListener("click", function (e) {
  if (e.target.tagName === "IMG") {
    openModal(e.target.src);
  }
});

// Event listener for clicking on the close button
closeModalButton.addEventListener("click", closeModal);

// Event listener for clicking outside the modal to close it
window.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

// Fetch blog post
async function fetchBlogPost() {
  try {
    showLoader();

    const response = await fetch(postUrl);

    if (!response.ok) {
      throw new Error(`Error fetching blog post. Status: ${response.status}`);
    }

    // Extract the JSON data from the response
    const blogData = await response.json();

    // Display the blog post content
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
