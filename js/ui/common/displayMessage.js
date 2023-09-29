export function displayMessage(message, type, container) {
  let parent = container;

  if (typeof container === "string") {
    parent = document.querySelector(container);
  }

  parent.innerHTML = `<div class="message ${type}">${message}</div>`;
}
