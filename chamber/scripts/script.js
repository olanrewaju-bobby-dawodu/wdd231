document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("membersContainer");

  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error("Failed to fetch members data.");
    }

    const data = await response.json();
    const members = data.members;

    members.forEach((member) => {
      const card = document.createElement("article");
      card.classList.add("members-card");

      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.alt}" loading="lazy">
        <div class="members-info">
          <h4>${member.name}</h4>
          <p class="tagline">"${member.tagline}"</p>
          <hr class="members-divider">
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website.replace("https://", "")}</a></p>
          <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading members:", error);
    container.innerHTML = `<p class="error">Unable to load members at this time. Please try again later.</p>`;
  }
});
