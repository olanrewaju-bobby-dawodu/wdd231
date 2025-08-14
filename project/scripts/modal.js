document.addEventListener("DOMContentLoaded", () => {
    const infoModal = document.querySelector("#info-modal");
    const openModalBtn = document.querySelector("#open-modal");
    const closeModalBtn = document.querySelector("#close-modal");

    if (infoModal && openModalBtn && closeModalBtn) {
        // Open modal
        openModalBtn.addEventListener("click", () => {
            infoModal.showModal();
        });

        // Close modal when "Close" button is clicked
        closeModalBtn.addEventListener("click", () => {
            infoModal.close();
        });

        // Optional: Close modal when clicking outside the modal content
        infoModal.addEventListener("click", (event) => {
            const dialogDimensions = infoModal.getBoundingClientRect();
            if (
                event.clientX < dialogDimensions.left ||
                event.clientX > dialogDimensions.right ||
                event.clientY < dialogDimensions.top ||
                event.clientY > dialogDimensions.bottom
            ) {
                infoModal.close();
            }
        });
    }
});
