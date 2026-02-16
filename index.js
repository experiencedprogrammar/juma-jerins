/* ================================
   NAVBAR LOADER & LOGIC
================================ */
function initNavbar() {
  const themeToggle = document.getElementById("themeToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const hamburger = document.querySelector(".hamburger");

  if (!themeToggle) return;

  // Restore theme
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
    themeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
  }

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const icon = themeToggle.querySelector("i");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");

    localStorage.setItem(
      "theme",
      document.body.classList.contains("light-theme") ? "light" : "dark"
    );
  });

  // Mobile menu
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close menu on link click
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Active link
  const currentPage = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

/* ================================
   HERO TYPING EFFECT
================================ */
function initTypingEffect() {
  const typingText = document.getElementById("typingText");
  const cursor = document.querySelector(".cursor");

  if (!typingText || !cursor) return;

  const texts = [
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Tech Innovator"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function typeEffect() {
    const currentText = texts[textIndex];

    if (!isDeleting && !isPaused) {
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isDeleting = true;
        }, 1500);
      }
    } else if (isDeleting && !isPaused) {
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  function cursorBlink() {
    cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
    setTimeout(cursorBlink, 500);
  }

  setTimeout(typeEffect, 1000);
  setTimeout(cursorBlink, 1500);
}

/* ================================
   INTERSECTION ANIMATIONS
================================ */
function initScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".about-card").forEach(card => {
    observer.observe(card);
  });
}

/* ================================
   FLOATING ELEMENTS
================================ */
function animateFloatingElements() {
  document.querySelectorAll(".floating-element").forEach((el, i) => {
    el.style.animation = `float 6s ease-in-out ${i * 0.5}s infinite alternate`;
  });
}

/* ================================
   INITIALIZE EVERYTHING
================================ */
document.addEventListener("DOMContentLoaded", () => {

  // Load navbar
  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("navbar-placeholder").innerHTML = html;
      initNavbar();
    })
    .catch(err => console.error("Navbar load error:", err));

  initTypingEffect();
  initScrollAnimations();
  animateFloatingElements();
});
