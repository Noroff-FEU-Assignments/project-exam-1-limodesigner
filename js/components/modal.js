const modal = document.querySelector("[data-modal]");

modal.addEventlistener("click", (e) => {
  const imageClose = modal.getBoundingClientRect();
  if (
    e.clientX < imageClose.left ||
    e.clientX < imageClose.right ||
    e.clientX < imageClose.top ||
    e.clientX < imageClose.bottom
  ) {
    modal.close();
  }
});
