 // Current year
const year = document.querySelector("#currentyear");
const today = new Date();
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

// Date in WAT
document.addEventListener("DOMContentLoaded", () => {
    const lastModRaw = document.lastModified;
    const localDate = new Date(lastModRaw);

    // Convert to UTC+1 (WAT)
    const watOffsetMs = 60 * 60 * 1000; // 1 hour in milliseconds
    const watDate = new Date(localDate.getTime() + watOffsetMs - (localDate.getTimezoneOffset() * 60000));

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(watDate);

    document.getElementById("lastModified").textContent = `Last Modification: ${formattedDate} West Africa Time`;
});