// ===============================
// Global Elements for All Pages
// ===============================

// Menu toggle
const menuToggle = document.querySelector("#menu-toggle"); // fixed selector
const navMenu = document.querySelector("#main-nav");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active"); // toggles the 'active' state
    menuToggle.classList.toggle("active");
  });
}

// Current Year & Last Modified
const yearSpan = document.querySelector("#currentyear");
const lastModifiedSpan = document.querySelector("#last-modified");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
if (lastModifiedSpan) {
  lastModifiedSpan.textContent = document.lastModified;
}

// ===============================
// Gallery Page (gallery.html)
// ===============================
if (document.querySelector("#artwork-gallery")) {
  fetch("data/artworks.json")
    .then(response => {
      if (!response.ok) throw new Error("Error loading artworks.");
      return response.json();
    })
    .then(data => {
      const galleryContainer = document.querySelector("#artwork-gallery");
      galleryContainer.innerHTML = "";
      data.artworks.forEach(art => {
        const card = document.createElement("article");
        card.classList.add("art-card");

        card.innerHTML = `
          <img src="${art.image}" alt="${art.title} by ${art.artist}" loading="lazy">
          <h3>${art.title}</h3>
          <p><strong>Artist:</strong> ${art.artist}</p>
          <p><strong>Year:</strong> ${art.year}</p>
          <p><strong>Medium:</strong> ${art.medium}</p>
        `;

        galleryContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      document.querySelector("#artwork-gallery").innerHTML = "<p>Failed to load artworks.</p>";
    });
}

// ===============================
// Form Page (form.html)
// ===============================
if (document.querySelector("#artwork-form")) {
  const form = document.querySelector("#artwork-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const formObject = {};
    formData.forEach((value, key) => (formObject[key] = value));

    localStorage.setItem("submittedArtwork", JSON.stringify(formObject));

    window.location.href = "thankyou.html";
  });
}

// ===============================
// Thank You Page (thankyou.html)
// ===============================
if (document.querySelector("#thankyou-data")) {
  const savedData = JSON.parse(localStorage.getItem("submittedArtwork"));

  if (savedData) {
    const container = document.querySelector("#thankyou-data");
    container.innerHTML = `
      <h2>Submission Details</h2>
      <p><strong>Title:</strong> ${savedData.title || ""}</p>
      <p><strong>Artist:</strong> ${savedData.artist || ""}</p>
      <p><strong>Year:</strong> ${savedData.year || ""}</p>
      <p><strong>Medium:</strong> ${savedData.medium || ""}</p>
      <p><strong>Description:</strong> ${savedData.description || ""}</p>
    `;
  } else {
    document.querySelector("#thankyou-data").innerHTML = "<p>No submission found.</p>";
  }
}

// ===============================
// About Page (about.html)
// ===============================
if (document.querySelector("#about-section")) {
  console.log("About page loaded.");
}

// ===============================
// Index Page (index.html)
// ===============================
if (document.querySelector("#featured-grid")) { // fixed to match your HTML
  fetch("data/artworks.json")
    .then(response => {
      if (!response.ok) throw new Error("Error loading artworks.");
      return response.json();
    })
    .then(data => {
      const featuredContainer = document.querySelector("#featured-grid");
      featuredContainer.innerHTML = "";

      data.artworks.slice(0, 3).forEach(art => {
        const card = document.createElement("article");
        card.classList.add("art-card");

        card.innerHTML = `
          <img src="${art.image}" alt="${art.title} by ${art.artist}" loading="lazy">
          <h3>${art.title}</h3>
          <p><strong>Artist:</strong> ${art.artist}</p>
          <p><strong>Year:</strong> ${art.year}</p>
        `;

        featuredContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      document.querySelector("#featured-grid").innerHTML = "<p>Failed to load featured artworks.</p>";
    });
}
