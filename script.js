document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(18px)";
  section.style.transition = "opacity .7s ease, transform .7s ease";
  observer.observe(section);
});

const style = document.createElement("style");
style.textContent = ".section.visible{opacity:1!important;transform:none!important}";
document.head.appendChild(style);


const copyButton = document.querySelector(".copy-email");
const copyFeedback = document.querySelector(".copy-feedback");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      copyFeedback.textContent = "Email copied to clipboard.";
      setTimeout(() => copyFeedback.textContent = "", 2200);
    } catch {
      copyFeedback.textContent = copyButton.dataset.email;
    }
  });
}


const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}
