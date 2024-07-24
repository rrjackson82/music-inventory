let baseUrl = "http://127.0.0.1:5000";
const placeholder = document.querySelector("#placeholder");
const albumSearchText = document.querySelector("#album_search")
let searchButton = document.querySelector("#searchButton")

placeholder.style.color = "gray"

function changeAlbumPlaceholder(text = "", color = "white", data = null) {
    if (data != null) {
        let output = "";
        //format
        output = output + `${data.title} (${data.band}) has ${(data.tracks).length} tracks: \n`;
        //loop through the tracks on that album and number them
        for (let i = 0; i < (data.tracks).length; i++) {
            output = output + `<br>${i + 1}. ${data.tracks[i]}`
        }
        placeholder.innerHTML = output
    } else if (text !== "") {
        placeholder.textContent = text
    } else {
        // if both are empty or null, then we know that the fetch req was bad
        placeholder.textContent = "INVALID SEARCH";
        color = 'red'
        console.log("Error - text and data empty");
    }
    albumSearchText.value = ""
    albumSearchText.blur();
    placeholder.style.color = color
}

searchButton.addEventListener("click", () => {
    searchAlbum(albumSearchText.value).then(data => {
        console.log(data);
        changeAlbumPlaceholder("", "white", data)
    })
})

albumSearchText.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchAlbum(albumSearchText.value).then(data => {
            changeAlbumPlaceholder("", "white", data)
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
        const data = await response.json()
        return data
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
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

fetchData().then(data => {
    if (data) {
        allSongs = data
        // console.log("songs: " + songs)
    }
})