document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.getElementById("heroSection");
  const nextHeroBtn = document.getElementById("nextHero");
  const prevHeroBtn = document.getElementById("prevHero");
  const testimonialWrapper = document.getElementById("testimonialWrapper");
  const testimonialNext = document.getElementById("nextBtn");
  const testimonialPrev = document.getElementById("prevBtn");

  // Flash Sales Popup Modal logic (commented out)
  // window.addEventListener('load', () => {
  //   const modal = document.getElementById('popup-modal');
  //   const mainContent = document.getElementById('main-content');
  //   if (modal && mainContent) {
  //     modal.classList.remove('hidden');
  //     modal.classList.add('flex');
  //     mainContent.classList.add('opacity-0');
  //     mainContent.classList.remove('opacity-100');
  //   }
  // });

  // Close Modal Function (Globally accessible)
  // window.closeModal = function () {
  //   const modal = document.getElementById('popup-modal');
  //   const mainContent = document.getElementById('main-content');
  //   if (modal && mainContent) {
  //     modal.classList.add('hidden');
  //     modal.classList.remove('flex');
  //     mainContent.classList.remove('opacity-0');
  //     mainContent.classList.add('opacity-100');
  //   }
  // }

  // Dropdown Toggle Function
  function toggleDropdown(id) {
    document
      .querySelectorAll('[id$="DropdownDesktop"], [id$="DropdownMobile"]')
      .forEach((dropdown) => {
        if (dropdown.id !== id) dropdown.classList.add("hidden");
      });

    const el = document.getElementById(id);
    el.classList.toggle("hidden");
  }

  window.toggleDropdown = toggleDropdown;

  // Close dropdowns on outside click
  document.addEventListener("click", function (e) {
    const dropdowns = document.querySelectorAll('[id$="DropdownDesktop"], [id$="DropdownMobile"]');
    dropdowns.forEach((dropdown) => {
      if (
        !dropdown.contains(e.target) &&
        !dropdown.previousElementSibling.contains(e.target)
      ) {
        dropdown.classList.add("hidden");
      }
    });
  });

  // Hero slider images
  const heroBackgrounds = [
    "./assets/images/hero-img-1.png",
    "./assets/images/hero-img-2.png",
    "./assets/images/hero-img-3.png",
  ];

  let heroIndex = 0;
  let testimonialIndex = 0;

  function updateHeroBackground() {
    heroSection.style.backgroundImage = `url('${heroBackgrounds[heroIndex]}')`;
  }

  if (nextHeroBtn && prevHeroBtn) {
    nextHeroBtn.addEventListener("click", () => {
      heroIndex = (heroIndex + 1) % heroBackgrounds.length;
      updateHeroBackground();
    });

    prevHeroBtn.addEventListener("click", () => {
      heroIndex = (heroIndex - 1 + heroBackgrounds.length) % heroBackgrounds.length;
      updateHeroBackground();
    });
  }

  // Testimonial slider logic
  if (testimonialWrapper && testimonialNext && testimonialPrev) {
    const testimonialCount = testimonialWrapper.children.length;

    testimonialNext.addEventListener("click", () => {
      if (testimonialIndex < testimonialCount - 1) {
        testimonialIndex++;
        testimonialWrapper.style.transform = `translateX(-${100 * testimonialIndex}%)`;
      }
    });

    testimonialPrev.addEventListener("click", () => {
      if (testimonialIndex > 0) {
        testimonialIndex--;
        testimonialWrapper.style.transform = `translateX(-${100 * testimonialIndex}%)`;
      }
    });
  }

  // View More / View Less toggle for multiple sections
  document.querySelectorAll(".view-more-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.closest("section");
      const moreCards = section.querySelector(".more-cards");

      if (moreCards) {
        moreCards.classList.toggle("hidden");
        button.textContent = moreCards.classList.contains("hidden") ? "View more" : "View less";
      }
    });
  });
});
