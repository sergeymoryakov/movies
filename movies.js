const movieSearchNode = document.getElementById("movieSearch");
const movieSearchBtnNode = document.getElementById("movieSearchBtn");
let searchResultNode = document.getElementById("searchResult");
const cardDetailsNode = document.getElementById("cardDetails");

movieSearchBtnNode.addEventListener("click", function () {
    const movieName = movieSearchNode.value;
    const url = `https://www.omdbapi.com/?s=${movieName}&apikey=${key}`;
    if (movieName.length <= 0) {
        searchResultNode.innerHTML = `<h3 class="msg">Please enter a movie name...</h3>`;
    } else {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                if (data.Response === "False") {
                    renderNoFindings();
                } else {
                    renderSearchResult(data);
                }
            });
    }
});

function renderNoFindings() {
    searchResultNode.innerHTML = `<h3 class="msg">Sorry, nothing in database. Try again.</h3>`;
}

function renderSearchResult(result) {
    let htmlCode = "";
    searchResultNode.innerHTML = "";

    result.Search.forEach((item) => {
        // Set path to "No Poster" image placeholder
        const posterSrc =
            item.Poster !== "N/A"
                ? item.Poster
                : "./resources/img_no-poster.png";

        htmlCode += `
        <li id="${item.imdbID}" class="movie-search__card_wrapper">
            <div class="movie-search__card_poster-wrapper">
                <img
                    class="movie-search__card_poster"
                    src="${posterSrc}"
                    alt="No Poster"
                />
            </div>
            <div class="movie-search__card_description-wrapper">
                <h3 class="movie-search__card_title">
                    ${item.Title}
                </h3>
                <p class="movie-search__card_year">${item.Year}</p>
                <p class="movie-search__card_type">${item.Type}</p>
            </div>
        </li>
        `;
    });
    searchResultNode.innerHTML = htmlCode;

    const cardSelector = document.querySelectorAll(
        // ".movie-search__card_wrapper"
        ".search-result"
    );
    cardSelector.forEach((card) => {
        card.addEventListener("click", handleCardSelector);
    });
}

function handleCardSelector(event) {
    const cardSelected = event.target.closest(".movie-search__card_wrapper");
    if (!cardSelected) return; // ignore clicks outside the card wrapper
    console.log(cardSelected);

    const cardId = cardSelected.id;
    console.log(cardId);

    console.log(`Selected Card ID ${cardId}`);
    createDetailedCard(cardId);
}

function createDetailedCard(cardId) {
    const urlCard = `https://www.omdbapi.com/?i=${cardId}&apikey=${key}`;
    fetch(urlCard)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data);
            renderDetailedCard(data);
        });
}

function renderDetailedCard(cardData) {
    cardDetailsNode.innerHTML = "";

    // Set path to "No Poster" image placeholder
    const cardPosterSrc =
        cardData.Poster !== "N/A"
            ? cardData.Poster
            : "./resources/img_no-poster.png";

    const htmlCodeDetailed = `
     <div class="movie-card__description-wrapper">
        <div class="movie-card__poster-wrapper">
            <img
                class="movie-card__poster"
                src="${cardPosterSrc}"
                alt="No Poster"
            />
        </div>
        <div class="movie-card__wrapper-inner">
            <h2 class="movie-card__title">${cardData.Title}</h2>
            <p>Year: ${cardData.Year}</p>
            <p>Rated: ${cardData.Rated}</p>
            <p>Released: ${cardData.Released}</p>
            <p>Runtime: ${cardData.Runtime}</p>
            <p>Genre: ${cardData.Genre}</p>
            <p>Director: ${cardData.Director}</p>
            <p>Writer: ${cardData.Writer}</p>
            <p>Actors: ${cardData.Actors}</p>
        </div>
    </div>
    <p class="movie-card__plot">${cardData.Plot}</p>
    `;

    cardDetailsNode.innerHTML = htmlCodeDetailed;
}
