// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { updateCopyrightYear } from "../../constants/currentyear.js";
import { fetchBlogPosts } from "../../main.js";

const carousel = document.querySelector(".carousel");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const loader = document.getElementById("loader");
let startIndex = 0;
const postsPerPage = 1;

function createCarouselItem(post) {
  const item = document.createElement("div");
  item.classList.add("carousel-item");
  item.innerHTML = `
      <a href="blog.html?id=${post.id}">
          <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
          <p>${post.title.rendered}</p>
      </a>
  `;
  return item;
}

async function showPosts(start) {
  clearCarousel();
  startIndex = start;
  const posts = await fetchBlogPosts(startIndex, postsPerPage);
  posts.forEach((post) => {
    const item = createCarouselItem(post);
    carousel.appendChild(item);
  });
}

function clearCarousel() {
  const items = carousel.querySelectorAll(".carousel-item");
  items.forEach((item) => {
    carousel.removeChild(item);
  });
}

async function initCarousel() {
  await showPosts(startIndex);

  nextButton.addEventListener("click", async () => {
    await showPosts(startIndex + postsPerPage);
    addClickEventListeners(); // Re-add click event listeners
  });

  prevButton.addEventListener("click", async () => {
    if (startIndex >= postsPerPage) {
      await showPosts(startIndex - postsPerPage);
    } else {
      await showPosts(0);
    }
    addClickEventListeners();
  });
}

initCarousel();

updateCopyrightYear();
