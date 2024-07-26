let baseUrl = "http://127.0.0.1:5000";
const placeholder = document.querySelector("#placeholder");
const albumSearchText = document.querySelector("#album_search");
let searchButton = document.querySelector("#searchButton");
starList = document.querySelector("#album_star_input");
starContainer = document.querySelector("#star-container");
let star1 = document.querySelector("#star-1");
let star2 = document.querySelector("#star-2");
let star3 = document.querySelector("#star-3");
let star4 = document.querySelector("#star-4");
let star5 = document.querySelector("#star-5");

let stars = [star1, star2, star3, star4, star5];
let starRating = 0;
const starActiveColor = "#eddc00";
const starInactiveColor = "#ececec"

const warningColor = "#d74949"

stars.forEach(star => {
    star.addEventListener("click", () => {
        let i = stars.indexOf(star);
        starRating = i + 1;
        console.log(starRating);
        for (j = 0; j < stars.length; j++) {
            if (j <= i) {
                stars[j].style.color = starActiveColor;
            } else {
                stars[j].style.color = starInactiveColor;
            }
        }
    })
})

placeholder.style.color = "gray";


function changeAlbumPlaceholder(text = "", color = "white", data = null) {
    if (data != null) {
        let output = "";
        //format
        output = output + `${data.title} (${data.band}) has ${(data.tracks).length} tracks: \n`;
        //loop through the tracks on that album and number them
        for (let i = 0; i < (data.tracks).length; i++) {
            output = output + `<br>${i + 1}. ${data.tracks[i]}`;
        }
        placeholder.innerHTML = output;
    } else if (text !== "") {
        placeholder.textContent = text;
    } else {
        // if both the text and data are empty or null, then we know that the fetch req was bad
        placeholder.textContent = "404 - Never head of that terrible album...";
        color = warningColor;
    }
    albumSearchText.value = "";
    albumSearchText.blur();
    placeholder.style.color = color;
}

searchButton.addEventListener("click", () => {
    searchAlbum(albumSearchText.value).then(data => {
        console.log(data);
        changeAlbumPlaceholder("", "white", data);
    })
})

albumSearchText.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchAlbum(albumSearchText.value).then(data => {
            changeAlbumPlaceholder("", "white", data);
        })
    }
})

let allSongs = {}


async function searchAlbum(searchParams = "") {
    try {
        const response = await fetch(`http://127.0.0.1:5000/find-album/${searchParams}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/all-songs');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);

        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

fetchData().then(data => {
    if (data) {
        allSongs = data;
        // console.log("songs: " + songs)
    }
})