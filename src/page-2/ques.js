
function handleClick() {
    const inputValue = document.getElementById("userInput").value;
    if (inputValue.trim()) {
      alert(`You entered: ${inputValue}`);
    } else {
      alert("Please enter some text.");
    }
  }

const searchBox = document.querySelector('form')
const searchInput = document.querySelector('searchBox')
const resultList = document.querySelector('recipe-container')

searchBox.addEventListener('submit', (e) => {
  e.preventDefault()
  searchRecipes()

})

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".searchBox");
  const searchBtn = document.querySelector(".searchBtn");

  if (searchInput && searchBtn) {
    // Add event listener to the search button
    searchBtn.addEventListener("click", async (e) => {
      e.preventDefault(); // Prevent form submission
      
      const searchValue = searchInput.value.trim(); // Get the value of the search input

      if (searchValue) {
        try {
          await searchRecipes(searchValue); // Call the searchRecipes function
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
      } else {
        console.error("Search input is empty!");
      }
    });
  } else {
    if (!searchInput) console.error("searchInput not found in the DOM!");
    if (!searchBtn) console.error("searchBtn not found in the DOM!");
  }
});

// Function to fetch recipes
async function searchRecipes(searchValue) {
  try {
    const response = await fetch(
      `https://api.edamam.com/search?q=${encodeURIComponent(searchValue)}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=10`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    const data = await response.json();
    displayRecipes(data.hits); // Call displayRecipes with the fetched data
  } catch (error) {
    console.error("Error in searchRecipes:", error);
  }
}

// Function to display recipes
function displayRecipes(recipes) {
  const recipeContainer = document.querySelector(".recipe-container");
  if (!recipeContainer) {
    console.error("Recipe container not found in the DOM!");
    return;
  }

  recipeContainer.innerHTML = ""; 

  if (recipes.length === 0) {
    recipeContainer.innerHTML = "<p>No recipes found. Try another search!</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";

    recipeCard.innerHTML = `
        <div>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <h3>${recipe.recipe.label}</h3>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank">More Details</a>
        </div> 
        `

    recipeContainer.appendChild(recipeCard);
  });
}


















