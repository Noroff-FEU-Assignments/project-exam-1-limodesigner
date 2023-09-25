// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { updateCopyrightYear } from "./currentyear.js";

document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader");
  const postTitle = document.querySelector("#blog-header__title");
  const postDateAuthor = document.querySelector(".post-date");
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
      postTitle.textContent = data.title.rendered;
      postDateAuthor.textContent = `Published on ${new Date(
        data.date
      ).toLocaleDateString()}`;
      postMedia.innerHTML = `<img src="${data._embedded["wp:featuredmedia"][0].source_url}" alt="Featured Image">`;
      postText.innerHTML = data.content.rendered;

      hideLoader();
    })
    .catch((error) => {
      console.error("Error fetching blogpost:", error);

      // Hide the loader in case of an error
      hideLoader();
    });
});

updateCopyrightYear();
