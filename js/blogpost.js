// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

import { showLoader, hideLoader } from "./loader.js";
import { updateCopyrightYear } from "./currentyear.js";

const blogContainer = document.querySelector(".post-content");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const postUrl = "https://sweetheartembroidery.com/wp-json/wp/v2/posts";
const specificPostUrl = postUrl + `/${id}?_embed`;

showLoader();

async function getPost() {
  try {
    const response = await fetch(specificPostUrl);
    const post = await response.json();
    createHtml(post);
  } catch (error) {
    console.error({ error: "Could not load blogpost." });
  } finally {
    hideLoader();
  }
}

getPost();

function createHtml(post) {
  const postTitle = post.title.rendered;
  const postContent = post.content.rendered;

  document.getElementById("blog-header__title").textContent = postTitle;
  blogContainer.innerHTML = postContent;

  const changeTitle = document.querySelector(".newtitle").innerText;
  document.title = `${postTitle}`;
}

updateCopyrightYear();
