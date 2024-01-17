const weatherEmojis = ["☀️", "🌧️", "❄️", "⛅", "🌩️", "🌦️", "🌤️"];

function changeEmoji() {
    const theEmojis = document.getElementById('headline-emoji');
    const randomIndex = Math.floor(Math.random() * weatherEmojis.length);
    const newEmoji = weatherEmojis[randomIndex];
    theEmojis.textContent = newEmoji;
}
