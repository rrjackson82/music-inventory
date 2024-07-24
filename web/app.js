let baseUrl = "http://127.0.0.1:5000";
const placeholder = document.querySelector("#placeholder");
const albumSearchText = document.querySelector("#album_search")
let searchButton = document.querySelector("#searchButton")

searchButton.addEventListener("click", () => {
    searchAlbum(albumSearchText.value).then(data => {
        console.log(data);
        placeholder.textContent = `${data.title} (${data.band}) has ${(data.tracks).length} tracks`
        albumSearchText.value = ""
        albumSearchText.blur();
    })
})

albumSearchText.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchAlbum(albumSearchText.value).then(data => {
            console.log(data);
            placeholder.textContent = `${data.title} (${data.band}) has ${(data.tracks).length} tracks`
            albumSearchText.value = ""
            albumSearchText.blur();
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
        alert("Search Invalid")
        albumSearchText.value = ""
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

        alert("search invalid");
    }
}

fetchData().then(data => {
    if (data) {
        allSongs = data
        // console.log("songs: " + songs)
        // console.log(songs[0].title)
    }
})