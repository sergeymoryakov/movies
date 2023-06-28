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
                renderSearchResult(data);
            });
    }
});

function renderSearchResult(result) {
    let htmlCode = "";
    searchResultNode.innerHTML = "";

    result.Search.forEach((item) => {
        // ATTN: FOR DEV ONLY - REMOVE IN PRODUCTION
        // console.log(item.Poster);
        // console.log(item.Title);
        // console.log(item.Type);
        // console.log(item.Year);
        // console.log(item.imdbID);

        htmlCode += `
        <li id="${item.imdbID}" class="movie-search__card_wrapper">
            <div class="movie-search__card_poster-wrapper">
                <img
                    class="movie-search__card_poster"
                    src="${item.Poster}"
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
    const cardSelected = event.target;
    // console.log(cardSelected);

    const cardId = cardSelected.id;
    // console.log(cardId);

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
    // console.log(cardData.Title);
    // console.log(cardData.Year);
    // console.log(cardData.Rated);
    // console.log(cardData.Released);
    // console.log(cardData.Runtime);
    // console.log(cardData.Genre);
    // console.log(cardData.Director);
    // console.log(cardData.Writer);
    // console.log(cardData.Actors);
    // console.log(cardData.Plot);
    // console.log(cardData.Poster);

    // ATTN: BELO DOESN'T WORK
    cardDetailsNode.innerHTML = "";

    const htmlCodeDetailed = `
     <div class="movie-card__description-wrapper">
        <div class="movie-card__poster-wrapper">
            <img
                class="movie-card__poster"
                src="${cardData.Poster}"
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
