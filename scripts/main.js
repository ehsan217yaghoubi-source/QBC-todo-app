const lightModeBtn = document.querySelector(".light-mode");
const darkModeBtn = document.querySelector(".dark-mode");
const navOpenBtn = document.querySelector(".nav-icon");
const nav = document.querySelector(".nav");

darkModeBtn.addEventListener("click", () => {
  document.documentElement.classList.add("dark");
  localStorage.setItem("darkMode", "dark");
});

lightModeBtn.addEventListener("click", () => {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("darkMode", "light");
});

window.addEventListener("load", () => {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

navOpenBtn.addEventListener("click", function(){
    nav.classList.remove("translate-x-full")
    // nav.classList.remove("-right-68")
    // nav.classList.add("right-0")
    // overlay.classList.add("overlay--visible")

});
