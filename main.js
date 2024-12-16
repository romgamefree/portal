let games = [];  // Store all games data
let currentGameIndex = 0;  // Track index to load more games
let isLoading = false;  // Prevent multiple fetches at once

// Load initial games from the JSON file
async function loadGames() {
  const response = await fetch("games.json");
  games = await response.json();
  localStorage.setItem("games", JSON.stringify(games));  // Save games in localStorage
}

// Render a list of games with their categories
function renderGames() {
    const container = document.getElementById("gameList");
    const gameCards = games.slice(currentGameIndex, currentGameIndex + 20);  // Load 20 games at a time
  
    gameCards.forEach(game => {
      const gameCard = document.createElement("div");
      gameCard.classList.add("game-card");
  
      // Create the <a> tag that will wrap the entire game card
      const gameLink = document.createElement("a");
      gameLink.href = `game-detail.html?gameId=${game.id}`;
      gameLink.classList.add("game-card-link");  // Optional: Add class for styling
  
      // Populate the game card content inside the <a> tag
      gameLink.innerHTML = `
        <img src="${game.thumb}" alt="${game.title}">
        <div class="content">
          <h3>${game.title}</h3>
          <p>${game.description}</p>
          <div class="category">Category: ${game.category}</div>
          <a href="${game.url}" target="_blank">Play Now</a>
        </div>
      `;
  
      // Append the game card link to the container
      gameCard.appendChild(gameLink);
      container.appendChild(gameCard);
    });
  
    currentGameIndex += 20;  // Update index to load next batch
  }
  

// Infinite scroll functionality
function handleScroll() {
  const container = document.getElementById("gameContainer");

  if (window.innerHeight + window.scrollY >= container.offsetHeight && !isLoading) {
    isLoading = true;
    setTimeout(() => {
      renderGames();  // Load next batch of games
      isLoading = false;
    }, 500);  // Delay to simulate loading
  }
}

// Search functionality
function setupSearch() {
  const searchBar = document.getElementById("searchBar");

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    const filteredGames = games.filter(game => game.title.toLowerCase().includes(query));

    // Reset game display and render filtered games
    currentGameIndex = 0;
    document.getElementById("gameList").innerHTML = '';
    games = filteredGames;
    renderGames();
  });
}

// Initialize game loading, search, and scroll
loadGames().then(() => {
  renderGames();  // Initial render
  window.addEventListener("scroll", handleScroll);  // Infinite scroll
  setupSearch();  // Setup search functionality
});
