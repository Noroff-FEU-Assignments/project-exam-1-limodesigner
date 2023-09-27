// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { displayBlogCard } from "./main.js";
import { updateCopyrightYear } from "./currentyear.js";

document.addEventListener("DOMContentLoaded", function () {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");
  const blogPostContent = document.querySelector(".blog-content");

  const postUrl = `https://sweetheartembroidery.com/wp-json/wp/v2/posts/${id}?_embed`;

  

  displayBlogCard(340, "blogCard340");
  displayBlogCard(350, "blogCard350");
  displayBlogCard(358, "blogCard358");

  updateCopyrightYear();
});
