// Page navigation logic
const homePage = document.getElementById('home-page');
const funFactPage = document.getElementById('fun-fact-page');
const favoritesPage = document.getElementById('favorites-page');
const getStartedBtn = document.getElementById('get-started-btn');
const viewFavoritesBtn = document.getElementById('view-favorites-btn');
const backToFactsBtn = document.getElementById('back-to-facts-btn');

// Fun Fact generation elements
const generateFactBtn = document.getElementById('generate-fact-btn');
const surpriseMeBtn = document.getElementById('surprise-me-btn');
const categorySelect = document.getElementById('category-select');
const factDisplay = document.getElementById('fact-display');
const saveFavoriteBtn = document.getElementById('save-favorite-btn');

// Favorites management elements
const favoritesList = document.getElementById('favorites-list');
const clearFavoritesBtn = document.getElementById('clear-favorites-btn');

// Fact data
const facts = {
    science: ["Water boils at 100 degrees Celsius.", "The Earth revolves around the Sun.", "Avocados are a fruit, not a vegetable.", "Trypophobia is the fear of closely-packed holes", "Australia is wider than the moon.", "Human teeth are the only part of the body that cannot heal themselves.", "The heart of a shrimp is located in its head."],
    animals: ["Cows have best friends.", "Octopuses have three hearts.", "Cows have best friends", "Dolphins have names for each other", "Elephants can hear with their feet.", "Kangaroos can't walk backward", "Penguins propose to their mates with pebbles"],
    history: ["The Great Wall of China is visible from space.", "The first Olympic Games took place in 776 BC.", "The shortest war in history lasted 38 to 45 minutes", "Napoleon Bonaparte was once attacked by a horde of bunnies", "Albert Einstein was offered the presidency of Israel in 1952"]
};

let currentFact = '';

// Page navigation
getStartedBtn.addEventListener('click', () => {
    // Hide the home page and show the fun fact page
    homePage.classList.remove('active');
    funFactPage.classList.add('active');
});

viewFavoritesBtn.addEventListener('click', () => {
    navigateToPage(favoritesPage);
    displayFavorites(); // Display favorites when navigating to favorites page
});

backToFactsBtn.addEventListener('click', () => {
    navigateToPage(funFactPage);
});

function navigateToPage(page) {
    homePage.classList.remove('active');
    funFactPage.classList.remove('active');
    favoritesPage.classList.remove('active');
    page.classList.add('active');
}

// Fact generation logic
generateFactBtn.addEventListener('click', () => {
    const selectedCategory = categorySelect.value;
    generateFact(selectedCategory);
    saveFavoriteBtn.disabled = false;  // Enable "Save to Favorites" button once fact is generated
});

surpriseMeBtn.addEventListener('click', () => {
    const categories = Object.keys(facts);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    generateFact(randomCategory);
    saveFavoriteBtn.disabled = false;
});

function generateFact(category) {
    const categoryFacts = facts[category];
    currentFact = categoryFacts[Math.floor(Math.random() * categoryFacts.length)];
    factDisplay.textContent = currentFact;
}

// Save to Favorites logic
saveFavoriteBtn.addEventListener('click', () => {
    if (currentFact && !isFactInFavorites(currentFact)) {
        addFavorite(currentFact);
    }
});

// Add fact to favorites
function addFavorite(fact) {
    let favorites = getFavorites();
    favorites.push(fact);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

// Get saved favorites from localStorage
function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

// Display saved favorites
function displayFavorites() {
    favoritesList.innerHTML = '';
    const favorites = getFavorites();
    favorites.forEach(fact => {
        const listItem = document.createElement('li');
        listItem.textContent = fact;

        // Add remove button for each favorite fact
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeFavorite(fact));

        listItem.appendChild(removeBtn);
        favoritesList.appendChild(listItem);
    });
}

// Check if fact is already in favorites
function isFactInFavorites(fact) {
    const favorites = getFavorites();
    return favorites.includes(fact);
}

// Remove fact from favorites
function removeFavorite(fact) {
    let favorites = getFavorites();
    favorites = favorites.filter(f => f !== fact);  // Remove the fact from the array
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();  // Re-render the updated favorites list
}

// Clear all favorites
clearFavoritesBtn.addEventListener('click', () => {
    localStorage.removeItem('favorites');
    displayFavorites();
});

// Initial load of favorites when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    homePage.classList.add('active');  // Make sure home page is visible initially
    displayFavorites();
});
