document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const modeToggle = document.getElementById("mode");
  const body = document.body;

  // === Hamburger Menu Toggle ===
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("hidden");
    hamburger.classList.toggle("open");

    const isOpen = hamburger.classList.contains("open");

    if (isOpen) {
      hamburger.textContent = "✖";
      hamburger.setAttribute("aria-label", "Close Menu");
      nav.style.left = "0";
    } else {
      hamburger.textContent = "☰";
      hamburger.setAttribute("aria-label", "Open Menu");
      nav.style.left = "-100%";
    }
  });

  // === Dark Mode Toggle ===
  modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);

    modeToggle.textContent = isDark ? "🌞" : "🌓";
    modeToggle.setAttribute("aria-label", isDark ? "Switch to Light Mode" : "Switch to Dark Mode");
  });

  // === Load Saved Dark Mode ===
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  if (savedDarkMode) {
    body.classList.add("dark");
    modeToggle.textContent = "🌞";
    modeToggle.setAttribute("aria-label", "Switch to Light Mode");
  } else {
    modeToggle.textContent = "🌓";
    modeToggle.setAttribute("aria-label", "Switch to Dark Mode");
  }

  // === Responsive Reset on Resize ===
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      nav.classList.remove("hidden");
      nav.style.left = "initial";
      hamburger.classList.remove("open");
      hamburger.textContent = "☰";
    } else {
      nav.classList.add("hidden");
      nav.style.left = "-100%";
      hamburger.classList.remove("open");
      hamburger.textContent = "☰";
    }
  });

  // === Wayfinding: Highlight Current Nav Link ===
  const currentUrl = window.location.pathname.split("/").pop();
  const navLinks = nav.querySelectorAll("a");

  navLinks.forEach(link => {
    const linkUrl = link.getAttribute("href");
    if (linkUrl === currentUrl || (linkUrl === "index.html" && currentUrl === "")) {
      link.classList.add("active-nav");
    }
  });

  // === Grid/List View Toggle ===
  const gridBtn = document.getElementById("gridViewBtn");
  const listBtn = document.getElementById("listViewBtn");
  const membersContainer = document.getElementById("membersContainer");

  const savedView = localStorage.getItem("memberView");

  if (membersContainer) {
    if (savedView === "list") {
      membersContainer.classList.add("list-view");
      membersContainer.classList.remove("grid-view");
    } else {
      membersContainer.classList.remove("list-view");
      membersContainer.classList.add("grid-view");
    }

    if (gridBtn && listBtn) {
      gridBtn.addEventListener("click", () => {
        membersContainer.classList.remove("list-view");
        membersContainer.classList.add("grid-view");
        localStorage.setItem("memberView", "grid");
      });

      listBtn.addEventListener("click", () => {
        membersContainer.classList.add("list-view");
        membersContainer.classList.remove("grid-view");
        localStorage.setItem("memberView", "list");
      });
    }
  }
});
