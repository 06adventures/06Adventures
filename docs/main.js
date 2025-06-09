document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.getElementById("heroSection");
  const nextHeroBtn = document.getElementById("nextHero");
  const prevHeroBtn = document.getElementById("prevHero");
  const testimonialWrapper = document.getElementById("testimonialWrapper");
  const testimonialNext = document.getElementById("nextBtn");
  const testimonialPrev = document.getElementById("prevBtn");

  const toggleBtn = document.getElementById('searchToggleBtn');
  const searchInput = document.getElementById('searchInput');
  const noResultsMessage = document.getElementById('noResultsMessage');

  const searchMap = {
    "our mission": "our-mission",
    "our vision": "our-vision",
    "core values": "core-values",
    "dubai": "dubai",
    "kenya": "kenya",
    "morocco": "morocco",
    "qatar": "qatar",
    "seychelles": "seychelles",
    "benin": "benin",
    "summer in seychelles": "seychelles",
    "salt beach": "salt-beach",
    "yolo beach resort": "yolo-beach",
    "avista beach resort": "avista-beach",
    "bel beach house": "bel-beach",
    "yacht hotel": "yacht-hotel",
    "lakowe-lakes-apartment": "lakowe-lakes",
    "hotel": "hotel",
    "beach": "yolo-beach",
    "vacation": "dubai",
    "what customers say about us": "customer-reviews",
    "frequently asked questions": "faqs",
    "faq": "faqs",
    "reviews": "customer-reviews"
  };

  if (toggleBtn && searchInput) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchInput.classList.toggle('hidden');
      if (!searchInput.classList.contains('hidden')) {
        searchInput.focus();
      }
    });

    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase().replace(/\s+/g, ' ');
      let matchedId = null;

      for (const [keyword, id] of Object.entries(searchMap)) {
        if (query.includes(keyword)) {
          matchedId = id;
          break;
        }
      }

      if (noResultsMessage) {
        noResultsMessage.classList.toggle('hidden', !!matchedId);
      }

      if (matchedId) {
        const targetSection = document.getElementById(matchedId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          targetSection.classList.add('ring-2', 'ring-purple', 'transition');
          setTimeout(() => {
            targetSection.classList.remove('ring-2', 'ring-purple');
          }, 2500);
        }
      }
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        searchInput.classList.add('hidden');
        if (noResultsMessage) noResultsMessage.classList.add('hidden');
      }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.classList.contains('hidden') &&
        !searchInput.contains(e.target) &&
        !toggleBtn.contains(e.target)) {
        searchInput.classList.add('hidden');
        if (noResultsMessage) noResultsMessage.classList.add('hidden');
      }
    });
  }

  function toggleDropdown(id) {
    document
      .querySelectorAll('[id$="DropdownDesktop"], [id$="DropdownMobile"], [id$="Dropdown"]')
      .forEach((dropdown) => {
        if (dropdown.id !== id) dropdown.classList.add("hidden");
      });

    const el = document.getElementById(id);
    el.classList.toggle("hidden");
  }

  window.toggleDropdown = toggleDropdown;

  document.addEventListener("click", function (e) {
    const dropdowns = document.querySelectorAll('[id$="DropdownDesktop"], [id$="DropdownMobile"], [id$="Dropdown"]');
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target) &&
        !dropdown.previousElementSibling.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });
  });

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

  // ✅ Corrected "View More" Logic
  document.querySelectorAll(".view-more-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.closest("section");
      const moreCards = section.querySelectorAll(".more-card");

      if (moreCards.length > 0) {
        const isShowing = !moreCards[0].classList.contains("hidden");

        moreCards.forEach((card) => {
          card.classList.toggle("hidden");
        });

        button.textContent = isShowing ? "View more" : "View less";
      }
    });
  });

  document.querySelectorAll('.destination-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.dataset.target;
      const targetCard = document.getElementById(targetId);

      if (!targetCard) return;

      const parentCard = targetCard.closest('.more-card');
      if (parentCard && parentCard.classList.contains('hidden')) {
        parentCard.classList.remove('hidden');

        const toggleBtn = parentCard.closest("section")?.querySelector(".view-more-btn");
        if (toggleBtn) toggleBtn.textContent = "View less";
      }

      const dropdown = document.getElementById("destDropdown");
      if (dropdown) dropdown.classList.add("hidden");

      setTimeout(() => {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetCard.classList.add('ring-2', 'ring-purple', 'transition');
        setTimeout(() => {
          targetCard.classList.remove('ring-2', 'ring-purple');
        }, 2500);
      }, 200);
    });
  });
});
