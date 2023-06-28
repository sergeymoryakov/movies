import { movieExampleData } from "./data.js";

const moviesList = movieExampleData;

const movieSearchListNode = document.getElementById("movieSearchList");

// renderCardsList(moviesList);

function clearMovieSearchList() {
    return (movieSearchListNode.innerHTML = "");
}

function renderCardsList(cardsList) {
    clearMovieSearchList();

    cardsList.forEach((item) => {
        console.log(item.Title);
    });
}
