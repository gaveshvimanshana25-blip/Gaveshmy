const movies = [
    { title: "Avengers: Endgame", image: "https://via.placeholder.com/200x300?text=Avengers" },
    { title: "Spider-Man: No Way Home", image: "https://via.placeholder.com/200x300?text=Spider-Man" },
    { title: "Inception", image: "https://via.placeholder.com/200x300?text=Inception" }
];

const series = [
    { title: "Stranger Things", image: "https://via.placeholder.com/200x300?text=Stranger+Things" },
    { title: "The Witcher", image: "https://via.placeholder.com/200x300?text=The+Witcher" },
    { title: "Breaking Bad", image: "https://via.placeholder.com/200x300?text=Breaking+Bad" }
];

function loadCards(data, containerId) {
    const container = document.getElementById(containerId);
    data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
        `;
        container.appendChild(card);
    });
}

loadCards(movies, "cards-container");
loadCards(series, "cards-container-series");
