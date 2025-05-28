const links = document.querySelectorAll(".main-nav a");
const currentUrl = window.location.pathname;

links.forEach((link) => {
  if (link.getAttribute("href").includes(currentUrl.split("/").pop())) {
    link.classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mainNav = document.getElementById("main-nav");

  hamburgerBtn.addEventListener("click", function () {
    mainNav.classList.toggle("active");
  });
});