const BODY_FIXED_CLASSNAME = "body-fixed";
const CARD_POPUP_ON_CLASSNAME = "card-popup-on";

const myFavorites = [
    {
        id: 0,
        imdbID: "tt1745960",
        title: "Top Gun: Maverick",
        completed: false,
        hidden: false,
    },
];

let activeCard = {};

const bodyNode = document.querySelector("body");
const movieSearchNode = document.getElementById("movieSearch");
const movieSearchBtnNode = document.getElementById("movieSearchBtn");
let searchResultNode = document.getElementById("searchResult");
const cardPopUpNode = document.getElementById("cardPopUp");
const cardPopUpReturnBtnNode = document.getElementById("cardPopUpReturnBtn");
const cardPopUpAddFavorBtnNode = document.getElementById(
    "cardPopUpAddFavorBtn"
);
const cardDetailsNode = document.getElementById("cardDetails");
const myFavoritesListNode = document.getElementById("myFavoritesList");

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

cardPopUpReturnBtnNode.addEventListener("click", toggleCardPopUp);

cardPopUpAddFavorBtnNode.addEventListener("click", function () {
    addFavoriteItem(activeCard);
    renderFavorites();
});

function clearSearchResult() {
    return (searchResultNode.innerHTML = "");
}

function renderNoFindings() {
    searchResultNode.innerHTML = `<h3 class="msg">Sorry, nothing in database. Try again.</h3>`;
}

function renderSearchResult(result) {
    let htmlCode = "";
    clearSearchResult();

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
     <div class="card-popup__description-wrapper">
        <div class="card-popup__poster-wrapper">
            <img
                class="card-popup__poster"
                src="${cardPosterSrc}"
                alt="No Poster"
            />
        </div>
        <div class="card-popup__wrapper-inner">
            <h2 class="card-popup__title">${cardData.Title}</h2>
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
    <p class="card-popup__plot">${cardData.Plot}</p>
    `;

    cardDetailsNode.innerHTML = htmlCodeDetailed;
    toggleCardPopUp();
    activeCard = cardData;
    console.log(activeCard);
}

function toggleCardPopUp() {
    bodyNode.classList.toggle(BODY_FIXED_CLASSNAME);
    cardPopUpNode.classList.toggle(CARD_POPUP_ON_CLASSNAME);
}

function clearMyFavorites() {
    return (myFavoritesListNode.innerHTML = "");
}

function addFavoriteItem(favoriteData) {
    const newFavoriteItem = {
        id: generateUniqueId(myFavorites),
        imdbID: favoriteData.imdbID,
        title: favoriteData.Title,
        completed: false,
        hidden: false,
    };

    console.log(newFavoriteItem);
    myFavorites.push(newFavoriteItem);
    console.log(myFavorites);
}

function generateUniqueId(arrayList) {
    let id = 0;
    while (arrayList.some((item) => item.id === id)) {
        id++;
    }
    return id;
}

function createFavotiteItem(item) {
    const listItem = document.createElement("li");
    if (item.completed) {
        listItem.className = "display-item-wrapper completed";
    } else {
        listItem.className = "display-item-wrapper";
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox_${item.id}`;
    checkbox.className = "item-checkbox";
    checkbox.checked = item.completed;

    const label = document.createElement("label");
    label.className = "display-item";
    label.htmlFor = `checkbox_${item.id}`;
    label.innerText = item.title;

    const hideButton = document.createElement("button");
    hideButton.className = "item-hide-btn";
    hideButton.id = `btn_${item.id}`;
    // hideButton.innerText = '';

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(hideButton);

    return listItem;
}

function renderFavorites() {
    clearMyFavorites();

    myFavorites.forEach((item) => {
        if (!item.hidden) {
            const favoriteItem = createFavotiteItem(item);
            myFavoritesListNode.appendChild(favoriteItem);
            console.log(`favoriteItem : ${favoriteItem}`);
        }
    });
}
