let baseUrl = "http://127.0.0.1:5000";
const placeholder = document.querySelector("#placeholder");
const albumSearchText = document.querySelector("#album_search")
let searchButton = document.querySelector("#searchButton")

searchButton.addEventListener("click", searchAlbum)


async function searchAlbum() {
    try {
        const response = await fetch(`http://127.0.0.1:5000/find-album/${albumSearchText.value}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data)
        placeholder.textContent = `${data.title} by ${data.band} has ${(data.tracks).length} tracks`
        albumSearchText.value = ""
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
        console.error('Error fetching data:', error);
    }
}

// fetchData().then(data => {
//     if (data) {
//         let output = ""
//         console.log(data);
//         data.forEach(album => {
//             output = output + " " + album.title
//         })
//         placeholder.textContent = output
//     }
// })