import { recipes } from './recipes.mjs';

// Get random index
function getRandomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
}

// Get random recipe
function getRandomRecipe(recipes) {
    const randomIndex = getRandomIndex(recipes.length);
    return recipes[randomIndex];
}

// Render recipe tags
function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

// Render recipe rating
function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        html += i <= rating ? '⭐' : '☆';
    }
    html += `</span>`;
    return html;
}

// Render individual recipe template
function recipeTemplate(recipe) {
    return `
        <figure class="recipe">
            <img src="${recipe.image}" alt="Image of ${recipe.title}" />
            <figcaption>
                <ul class="recipe__tags">
                    ${tagsTemplate(recipe.tags || [])}
                </ul>
                <h2>${recipe.title}</h2>
                <p class="recipe__ratings">${ratingTemplate(recipe.rating)}</p>
                <p class="recipe__description">${recipe.description}</p>
            </figcaption>
        </figure>`;
}

// Render recipes on the page
function renderRecipes(recipeList) {
    const recipesContainer = document.querySelector('#recipes');
    recipesContainer.innerHTML = recipeList.map(recipeTemplate).join('');
}

// Search handler for filtering recipes
function searchHandler(event) {
    event.preventDefault();
    const query = event.target.querySelector('input').value.toLowerCase();
    const filteredRecipes = filterRecipes(query);
    renderRecipes(filteredRecipes);
}

// Filter recipes based on search query
function filterRecipes(query) {
    return recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        (recipe.tags || []).some(tag => tag.toLowerCase().includes(query))
    ).sort((a, b) => a.title.localeCompare(b.title));
}

// Initialize app
function init() {
    const randomRecipe = getRandomRecipe(recipes);
    renderRecipes([randomRecipe]);

    // Add event listener to search form
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', searchHandler);
}

init();
