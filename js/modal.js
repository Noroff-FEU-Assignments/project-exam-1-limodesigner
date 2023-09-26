export default function showImageModal(image) {
  const modal = document.querySelector(".image-modal");
  modal.classList.add("show");
  const modalBody = document.querySelector(".image-modal__body");
  const modalImage = document.createElement("img");
  modalImage.src = image.src;
  modalBody.append(modalImage);
  modal.append(modalBody);
  modal.addEventListener("click", () => {
    modalBody.innerHTML = "";
    modal.classList.remove("show");
  });
}
