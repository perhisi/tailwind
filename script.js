const mobileOpenButton = document.getElementById("mobile-open-button");
const mobileMenu = document.getElementById("mobile-menu");
const mobileCloseButton = document.getElementById("mobile-close-button");

// Toggle mobile menu
mobileOpenButton.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden");
  document.body.style.overflow = "hidden";
});

// Close mobile menu
const closeMobileMenu = () => {
  mobileMenu.classList.add("hidden");
  document.body.style.overflow = "";
};

mobileCloseButton.addEventListener("click", closeMobileMenu);

// Close menu when any link inside is clicked
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// Accessibility: close menu on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
    closeMobileMenu();
    mobileOpenButton.focus();
  }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in-up");
    }
  });
}, observerOptions);

document.querySelectorAll(".project-card, .glass-card").forEach((el) => {
  el.style.opacity = "0";
  observer.observe(el);
});

// Experience Carousel Pagination Script

document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.getElementById("experience-slides");
  const prevBtn = document.getElementById("exp-prev-btn");
  const nextBtn = document.getElementById("exp-next-btn");
  const pagination = document.getElementById("experience-pagination");

  if (!slidesContainer || !prevBtn || !nextBtn || !pagination) return;

  const slides = slidesContainer.querySelectorAll(".w-full.flex-shrink-0");
  const totalSlides = slides.length;
  let currentSlide = 0;

  // Create pagination dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.className =
      "w-3 h-3 rounded-full transition-all duration-300 " +
      (i === 0
        ? "bg-indigo-600 dark:bg-indigo-400 scale-125"
        : "bg-slate-300 dark:bg-slate-600 hover:bg-indigo-400 dark:hover:bg-indigo-400");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dot.addEventListener("click", () => goToSlide(i));
    pagination.appendChild(dot);
  }

  function updatePagination() {
    const dots = pagination.querySelectorAll("button");
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.className =
          "w-3 h-3 rounded-full transition-all duration-300 bg-indigo-600 dark:bg-indigo-400 scale-125";
      } else {
        dot.className =
          "w-3 h-3 rounded-full transition-all duration-300 bg-slate-300 dark:bg-slate-600 hover:bg-indigo-400 dark:hover:bg-indigo-400";
      }
    });
  }

  function goToSlide(index) {
    currentSlide = index;
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    updatePagination();
    updateButtonStates();
  }

  function updateButtonStates() {
    prevBtn.style.opacity = currentSlide === 0 ? "0.5" : "1";
    prevBtn.style.pointerEvents = currentSlide === 0 ? "none" : "auto";
    nextBtn.style.opacity = currentSlide === totalSlides - 1 ? "0.5" : "1";
    nextBtn.style.pointerEvents =
      currentSlide === totalSlides - 1 ? "none" : "auto";
  }

  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && currentSlide > 0) {
      goToSlide(currentSlide - 1);
    } else if (e.key === "ArrowRight" && currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  });

  // Initialize
  updateButtonStates();
});