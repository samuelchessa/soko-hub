
// SOKOHUB - SERVICES MARKETPLACE JAVASCRIPT

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const cards = document.querySelectorAll(".listing-card");
    const categoryButtons = document.querySelectorAll(".category");
    const noResults = document.getElementById("noResults");
    const postButton = document.getElementById("postButton");
    const joinButton = document.getElementById("joinButton");

    let selectedCategory = "";

    // Search services and filter by category
    function filterServices() {
        const searchText = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        cards.forEach(function (card) {
            const cardText = card.textContent.toLowerCase();
            const cardCategory = card.dataset.category || "";

            const matchesSearch = cardText.includes(searchText);
            const matchesCategory =
                selectedCategory === "" ||
                cardCategory === selectedCategory;

            const isVisible = matchesSearch && matchesCategory;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        noResults.hidden = visibleCount > 0;
    }

    // Search when the form is submitted
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        filterServices();

        document.getElementById("services").scrollIntoView({
            behavior: "smooth"
        });
    });

    // Search as the user types
    searchInput.addEventListener("input", function () {
        filterServices();
    });

    // Filter services by category
    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedCategory = button.dataset.category || "";

            categoryButtons.forEach(function (categoryButton) {
                categoryButton.classList.remove("active");
            });

            button.classList.add("active");

            searchInput.value = "";
            filterServices();

            document.getElementById("services").scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Contact a service provider
    document.querySelectorAll(".contact-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            const card = button.closest(".listing-card");
            const title = card.querySelector("h3").textContent;
            const price = card.querySelector(".price").textContent;

            alert(
                "SokoHub Service\n\n" +
                "Service: " + title + "\n" +
                "Price: " + price +
                "\n\nProvider contact details will be added soon."
            );
        });
    });

    // Offer a service
    function offerService() {
        alert(
            "Welcome to SokoHub!\n\n" +
            "A form for adding your service will be added next."
        );
    }

    if (postButton) {
        postButton.addEventListener("click", offerService);
    }

    if (joinButton) {
        joinButton.addEventListener("click", offerService);
    }

    // Show all services when the page first opens
    const allServicesButton = document.querySelector(
        '.category[data-category=""]'
    );

    if (allServicesButton) {
        allServicesButton.classList.add("active");
    }

    filterServices();

    console.log("SokoHub services marketplace loaded successfully!");
});
