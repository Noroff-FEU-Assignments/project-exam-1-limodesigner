// Author: Linda Moenstre - Digitaldesigner.no 2023

const form = document.querySelector("#form");
const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const messageSuccess = document.querySelector("#messageSuccess");

function validateForm() {
  event.preventDefault();

  if (checkLength(name.value, 4) === true) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }

  if (checkEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (checkLength(subject.value, 14) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (checkLength(message.value, 24) === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function checkEmail(email) {
  const regEx = /^([A-Za-z0-9_\.\+-]+)@([\dA-Za-z-]+)(\.[A-Za-z]{2,6})+$/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

function messageSubmit(event) {
  event.preventDefault();
  if (
    checkLength(name.value, 4) &&
    checkEmail(email.value) &&
    checkLength(subject.value, 14) &&
    checkLength(message.value, 24)
  ) {
    messageSuccess.innerHTML = `<div class="message-success">
                                        <p>Your message was delivered.<br>
                                        We will contact you soon.</p>
                                        <p>If you are in a hurry, please call us - we would love to help you!</p>
                                    </div>`;
    form.reset();
  }
}

form.addEventListener("submit", messageSubmit);

const d = new Date();
document.getElementById("currentYear").innerHTML = d.getFullYear();
