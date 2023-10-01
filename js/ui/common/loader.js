// @author Linda Moenstre 2023 - <linda@digitaldesigner.no>

export function showLoader() {
  const loader = document.querySelector(".loader");
  loader.style.display = "block";
}

export function hideLoader() {
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
}
