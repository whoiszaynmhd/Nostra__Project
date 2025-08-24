document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const burger = document.querySelector(".hamburger");
  const links = document.querySelector(".nav-links");
  if (burger && links) {
    burger.addEventListener("click", () => {
      const show = links.classList.toggle("show");
      burger.setAttribute("aria-expanded", show ? "true" : "false");
    });
  }

  const searchBar = document.getElementById("searchBar");
  const filterCategory = document.getElementById("filterCategory");
  const clearBtn = document.getElementById("clearFilters");
  const resultCount = document.getElementById("resultCount");
  const noResults = document.getElementById("noResults");
  const products = Array.from(document.querySelectorAll(".product"));

  function applyFilters() {
    if (!products.length) return;
    const term = (searchBar?.value || "").trim().toLowerCase();
    const cat = filterCategory ? filterCategory.value : "all";
    let shown = 0;
    products.forEach((card) => {
      const name = (card.dataset.name || card.textContent || "").toLowerCase();
      const category = card.dataset.category || "all";
      const matchesText = !term || name.includes(term);
      const matchesCat = cat === "all" || category === cat;
      const show = matchesText && matchesCat;
      card.style.display = show ? "" : "none";
      if (show) shown++;
    });
    if (resultCount) resultCount.textContent = shown;
    if (noResults) noResults.style.display = shown === 0 ? "block" : "none";
  }

  if (searchBar) searchBar.addEventListener("input", applyFilters);
  if (filterCategory) filterCategory.addEventListener("change", applyFilters);
  if (clearBtn) clearBtn.addEventListener("click", () => {
    if (searchBar) searchBar.value = "";
    if (filterCategory) filterCategory.value = "all";
    applyFilters();
  });
  if (products.length) applyFilters();

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();
      if (!name || !email || !message) return alert("Please fill out all fields.");
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) return alert("Please enter a valid email address.");
      contactForm.reset();
      alert("Thanks! Your message has been sent.");
    });
  }

  document.querySelectorAll(".product .add").forEach((btn) =>
    btn.addEventListener("click", () => alert("Added to cart! (demo)"))
  );
});
