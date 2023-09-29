export function renderPosts(posts, container) {
  for (const post of posts) {
    const postContainer = document.createElement("li");
    postContainer.classList.add("blog-post");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("post-title");
    titleElement.textContent = post.title.rendered;

    if (post._embedded && post._embedded["wp:featuredmedia"]) {
      const imageUrl = post._embedded["wp:featuredmedia"][0].source_url;
      const imageElement = document.createElement("img");
      imageElement.classList.add("post-image");
      imageElement.src = imageUrl;
      postContainer.appendChild(imageElement);
    }

    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("post-excerpt");

    const apiContent = post.content.rendered;
    const parser = new DOMParser();
    const parsedContent = parser.parseFromString(apiContent, "text/html");
    const truncatedExcerpt = parsedContent.body.textContent.substring(0, 200);

    descriptionElement.textContent = truncatedExcerpt + "...";

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("blog-button-container");

    const readMoreButton = document.createElement("a");
    readMoreButton.classList.add("blog-button");
    readMoreButton.textContent = "Read";
    readMoreButton.href = `blog.html?id=${post.id}`;

    const readMoreParagraph = document.createElement("p");
    readMoreParagraph.appendChild(readMoreButton);

    buttonContainer.appendChild(readMoreParagraph);
    postContainer.appendChild(titleElement);
    postContainer.appendChild(descriptionElement);
    postContainer.appendChild(buttonContainer);
    container.appendChild(postContainer);
  }
}
