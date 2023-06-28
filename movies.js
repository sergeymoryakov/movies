const movieSearchNode = document.getElementById("movieSearch");
const movieSearchBtnNode = document.getElementById("movieSearchBtn");
let searchResultNode = document.getElementById("searchResult");

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
        <li class="movie-search__card_wrapper">
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
}
