// SOKOHUB MARKETPLACE JAVASCRIPT

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const searchForm = document.getElementById("searchForm");
    const cards = document.querySelectorAll(".listing-card");
    const categoryButtons = document.querySelectorAll(".category");

    let selectedCategory = "";
    let selectedType = "";

    // Search and filter listings
    function filterListings() {
        const searchText = searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

        cards.forEach(function (card) {
            const cardText = card.textContent.toLowerCase();
            const cardCategory = card.dataset.category || "";
            const cardType = card.dataset.type || "";

            const matchesSearch = cardText.includes(searchText);

            const matchesCategory =
                selectedCategory === "" ||
                cardCategory === selectedCategory;

            const matchesType =
                selectedType === "" ||
                cardType === selectedType;

            card.hidden = !(
                matchesSearch &&
                matchesCategory &&
                matchesType
            );
        });
    }

    // Search while typing
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            selectedCategory = "";
            selectedType = "";
            filterListings();
        });
    }

    // Search when Search button is clicked
  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        console.log("Search submitted!");
        console.log("Search word:", searchInput.value);

        selectedCategory = "";
        selectedType = "";

        filterListings();
    });
}
    

    // Filter by category
    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedCategory = button.dataset.category || "";
            selectedType = "";

            if (searchInput) {
                searchInput.value = "";
            }

            filterListings();
        });
    });

    // View all products or services
    document.querySelectorAll("[data-show]").forEach(function (button) {
        button.addEventListener("click", function () {
            selectedType = button.dataset.show === "products"
                ? "product"
                : "service";

            selectedCategory = "";

            if (searchInput) {
                searchInput.value = "";
            }

            filterListings();
        });
    });

    // View listing details
    document.querySelectorAll(".contact-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            const card = button.closest(".listing-card");

            if (!card) return;

            const title = card.querySelector("h3");
            const price = card.querySelector(".price");
            const category = card.querySelector(".listing-category");

            alert(
                "SokoHub Listing Details\n\n" +
                "Name: " + (title ? title.textContent : "Not available") +
                "\nPrice: " + (price ? price.textContent : "Contact seller") +
                "\nCategory: " + (category ? category.textContent : "Not available")
            );
        });
    });

    // Post listing buttons
    function postListing() {
        alert("Welcome to SokoHub! The listing submission form will be added next.");
    }

    const postButton = document.getElementById("postButton");
    const joinButton = document.getElementById("joinButton");

    if (postButton) {
        postButton.addEventListener("click", postListing);
    }

    if (joinButton) {
        joinButton.addEventListener("click", postListing);
    }

    // Initial display
    filterListings();

    console.log("SokoHub JavaScript loaded successfully!");
});