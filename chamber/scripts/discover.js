document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#cards-container");
    const visitMessage = document.querySelector("#visit-message");

    // 1. Last visit message using localStorage
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    if (lastVisit) {
        const daysSince = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        if (daysSince === 0) {
            visitMessage.textContent = "Welcome back! You visited earlier today.";
        } else if (daysSince === 1) {
            visitMessage.textContent = "Welcome back! Your last visit was yesterday.";
        } else {
            visitMessage.textContent = `Welcome back! It has been ${daysSince} days since your last visit.`;
        }
    } else {
        visitMessage.textContent = "Welcome! This is your first visit.";
    }
    localStorage.setItem("lastVisit", now);

    // 2. Fetch and display cards
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            data.members.forEach(member => {
                const card = document.createElement("div");
                card.classList.add("member-card");

                card.innerHTML = `
                    <img src="images/placeholder.webp" 
                         data-src="images/${member.image}" 
                         alt="${member.alt}" 
                         loading="lazy">
                    <h3>${member.name}</h3>
                    <p class="address">${member.address}</p>
                    <p class="description">${member.description}</p>
                    <a href="${member.website}" target="_blank" class="learn-more">Learn More</a>
                `;

                container.appendChild(card);
            });

            // 3. Lazy load images
            const lazyImages = document.querySelectorAll("img[data-src]");
            const imgObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute("data-src");
                        observer.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => {
                imgObserver.observe(img);
            });
        })
        .catch(err => console.error("Error loading members:", err));
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/members.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("member-cards");
      data.members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        card.innerHTML = `
          <img src="images/${member.image}" alt="${member.alt}" loading="lazy">
          <div class="members-info">
          <h4>${member.name}</h4>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Tagline:</strong> ${member.tagline}</p>
          <button class="learn-more">Learn More</button>
        `;

        // Attach click event
        card.querySelector(".learn-more").addEventListener("click", () => {
          document.getElementById("modalTitle").textContent = member.name;
          document.getElementById("modalImage").src = `images/${member.image}`;
          document.getElementById("modalImage").alt = member.alt;
          document.getElementById("modalDescription").textContent = member.description;
          document.getElementById("modalAddress").textContent = member.address;
          document.getElementById("modalPhone").textContent = member.phone;
          document.getElementById("modalWebsite").href = member.website;
          document.getElementById("learnMoreModal").style.display = "block";
        });

        container.appendChild(card);
      });

      // Close modal
      document.getElementById("closeModal").addEventListener("click", () => {
        document.getElementById("learnMoreModal").style.display = "none";
      });

      // Close on outside click
      window.addEventListener("click", (e) => {
        if (e.target.id === "learnMoreModal") {
          document.getElementById("learnMoreModal").style.display = "none";
        }
      });
    })
    .catch(error => console.error("Error loading members:", error));
});
