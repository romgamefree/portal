// Retrieve game data from the query string or pass the game details dynamically
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('id');  // Assuming each game has a unique ID passed in the URL

// Simulate fetching game details (replace with actual fetch request or dynamic data)
const gameDetails = {
  title: "Awesome Game",
  description: "This is an awesome game you can play directly from the portal. Enjoy!",
  iframeUrl: "https://example.com/game-iframe-url",  // URL of the game's iframe
};

document.getElementById('gameTitle').textContent = gameDetails.title;
document.getElementById('gameDescription').textContent = gameDetails.description;
document.getElementById('gameIframe').src = gameDetails.iframeUrl;

// Google Ads integration (replace with your Google Ad code)
function addGoogleAds() {
  const ads = document.querySelectorAll('.ad-banner');
  ads.forEach(ad => {
    // Dynamically add Google Ads iframe or script here
    ad.innerHTML = '<p>Google Ads - Content goes here</p>';
  });
}

addGoogleAds();
