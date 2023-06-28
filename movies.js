const movieSearchNode = document.getElementById("movieSearch");
const movieSearchBtnNode = document.getElementById("movieSearchBtn");
const searchResultNode = document.getElementById("searchResult");

movieSearchBtnNode.addEventListener("click", function () {
    const movieName = movieSearchNode.value;
    const url = `http://www.omdbapi.com/?s=${movieName}&apikey=${key}`;
    if (movieName.length <= 0) {
        searchResultNode.innerHTML = `<h3 class="msg">Please enter a movie name...</h3>`;
    } else {
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
            });
    }
});
