// travel_recommendation.js

// Task 6: Fetch recommendation data
let recommendations = [];

fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        recommendations = data; // Store fetched data
        console.log("Data loaded:", recommendations); // Check if data is accessible
    })
    .catch(error => console.error("Error fetching data:", error));

// Function to display results
function displayResults(results) {
    // Remove old results if any
    let existingSection = document.getElementById("results");
    if (existingSection) {
        existingSection.remove();
    }

    // Create a new results section
    const resultsSection = document.createElement("section");
    resultsSection.id = "results";

    if (results.length === 0) {
        resultsSection.innerHTML = "<h2>No results found.</h2>";
    } else {
        resultsSection.innerHTML = "<h2>Recommended Destinations</h2>";

        results.forEach(place => {
            const placeDiv = document.createElement("div");
            placeDiv.innerHTML = `
                <h3>${place.name}</h3>
                <p>${place.description}</p>
                <img src="${place.imageUrl}" alt="${place.name}" width="300">
            `;
            resultsSection.appendChild(placeDiv);
        });
    }

    // Add results section to the body
    document.body.appendChild(resultsSection);
}

// Task 7 & 8: Search logic
document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.toLowerCase();

    let filteredResults = [];

    if (query.includes("beach") || query.includes("beaches")) {
        filteredResults = recommendations.beaches || [];
    } else if (query.includes("temple") || query.includes("temples")) {
        filteredResults = recommendations.temples || [];
    } else if (query.includes("country") || query.includes("countries")) {
        filteredResults = recommendations.countries || [];
    }

    displayResults(filteredResults);
});

// Task 9: Reset logic
document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";

    let existingSection = document.getElementById("results");
    if (existingSection) {
        existingSection.remove();
    }
});
 