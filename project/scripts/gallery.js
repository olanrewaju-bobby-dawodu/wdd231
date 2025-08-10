// gallery.js

document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.getElementById('artwork-gallery');

  async function fetchArtworks() {
    try {
      const response = await fetch('data/artworks.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      displayArtworks(data.artworks);
    } catch (error) {
      galleryContainer.innerHTML = `<p class="error">Error loading artworks. Please try again later.</p>`;
      console.error('Fetch error:', error);
    }
  }

  function displayArtworks(artworks) {
    const cards = artworks.map(art => {
      return `
        <div class="art-card">
          <img src="${art.image}" alt="Artwork: ${art.title}" loading="lazy">
          <div class="art-info">
            <h3>${art.title}</h3>
            <p><strong>Artist:</strong> ${art.artist}</p>
            <p><strong>Year:</strong> ${art.year}</p>
            <p><strong>Medium:</strong> ${art.medium}</p>
          </div>
        </div>
      `;
    }).join('');
    galleryContainer.innerHTML = cards;
  }

  fetchArtworks();
});
