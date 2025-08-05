// Parse and display form data from URL parameters
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const summaryBox = document.getElementById("submission-summary");

  if (!params || [...params].length === 0) {
    summaryBox.innerHTML = "<p>No data submitted.</p>";
    return;
  }

  const entries = [...params.entries()];
  const formatted = entries.map(([key, value]) => {
    // Format key names for readability
    const label = key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase());
    return `<p><strong>${label}:</strong> ${decodeURIComponent(value.replace(/\+/g, ' '))}</p>`;
  }).join("");

  summaryBox.innerHTML = formatted;
});
