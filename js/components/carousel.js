// Author: Linda Moenstre - Digitaldesigner.no 2023

const carousel = document.querySelector(".carousel");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const loader = document.getElementById("loader");
let startIndex = 0;
const postsPerPage = 3;

async function fetchBlogPosts(start, perPage) {
  try {
    loader.style.display = "block"; // Show loader while fetching data
    const response = await fetch(
      `https://sweetheartembroidery.com/wp-json/wp/v2/posts?per_page=${perPage}&offset=${start}&_embed`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    loader.style.display = "none"; // Hide loader when data is fetched
  }
}

function createCarouselItem(post) {
  const item = document.createElement("div");
  item.classList.add("carousel-item");
  item.innerHTML = `
        <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${post.title.rendered}">
        <h3>${post.title.rendered}</h3>
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
  });

  prevButton.addEventListener("click", async () => {
    if (startIndex >= postsPerPage) {
      await showPosts(startIndex - postsPerPage);
    } else {
      // Handle edge case when startIndex is less than postsPerPage
      await showPosts(0);
    }
  });
}

initCarousel();
