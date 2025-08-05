document.addEventListener("DOMContentLoaded", () => {
  // === Set Timestamp ===
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // === Modal Open/Close Logic ===
  window.openModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.showModal();
  };

  window.closeModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.close();
  };

  // === Join Form Validation ===
  const form = document.getElementById("joinForm") || document.getElementById("membership-form");

  if (form) {
    form.setAttribute("novalidate", "");

    form.addEventListener("submit", (e) => {
      // Clear existing errors
      form.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));
      form.querySelectorAll(".error-message").forEach(el => el.remove());

      let valid = true;

      form.querySelectorAll("[required]").forEach(input => {
        const value = input.value.trim();

        if (!value) {
          valid = false;
          showError(input, "This field is required.");
        } else if (input.type === "email") {
          const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRe.test(value)) {
            valid = false;
            showError(input, "Please enter a valid email address.");
          }
        } else if (input.name === "title") {
          const titleRe = /^[A-Za-z\- ]{7,}$/;
          if (!titleRe.test(value)) {
            valid = false;
            showError(input, "Minimum 7 characters. Only letters, hyphens, and spaces allowed.");
          }
        }
      });

      const membershipChecked = form.querySelector('input[name="membership"]:checked');
      if (!membershipChecked) {
        valid = false;
        alert("Please select a membership level.");
      }

      if (!valid) {
        e.preventDefault();
        e.stopPropagation();
      }
    });

    form.addEventListener("input", (e) => {
      const input = e.target;
      if (input.classList.contains("input-error")) {
        input.classList.remove("input-error");
        input.removeAttribute("aria-invalid");

        const msg = input.parentNode.querySelector(".error-message");
        if (msg) msg.remove();
      }
    });
  }

  // === Helper Function to Show Error ===
  function showError(input, message) {
    input.classList.add("input-error");
    input.setAttribute("aria-invalid", "true");

    const msg = document.createElement("div");
    msg.className = "error-message";
    msg.textContent = message;
    input.parentNode.appendChild(msg);
  }
});
