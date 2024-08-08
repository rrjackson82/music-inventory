let baseUrl = "http://127.0.0.1:1982";
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

const newAlbumTitle = document.querySelector("#album_title_input");
const newAlbumYOR = document.querySelector("#album_band_YOR");
const newAlbumBand = document.querySelector("#album_band_input");
let newAlbumTracks = [];
const newAlbumGenre = document.querySelector("#album_genre_input");

const saveAlbumBtn = document.querySelector("#save_album_btn");

// add album
function addAlbum(title = "", band = "", release = 0, rating = 0, genre = "", tracks = []) {
    if (title == "" || band == "" || release == null || release == 0, rating == null || genre == "" || tracks.length == 0) {
        alert("please make sure all values are filled");
    } else {
        console.log(title, band, release, rating, genre, tracks)
        fetch(`http://127.0.0.1:1982/add-music`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": title,
                "band": band,
                "release year": release,
                "rating": rating,
                "genre": genre,
                "tracks": tracks,
                "stock": 0
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
            })
            .catch(error => {
                console.log("ERROR:", error);
            })

    }
}

saveAlbumBtn.addEventListener('click', () => {
    let trackChildren = trackContainer.children;
    for (let i = 0; i < trackChildren.length; i++) {
        if (i >= 1) {
            child = trackChildren[i]
            input = child.querySelector('input');
            console.log("Value: ", input.value)
            newAlbumTracks.push(input.value);
        }
        console.log(i)
    }
    console.log(newAlbumTracks)
    addAlbum(newAlbumTitle.value, newAlbumBand.value, newAlbumYOR.value, starRating, newAlbumGenre.value, newAlbumTracks)
});


const trackContainer = document.querySelector("#track_container")
let trackCount = 0;
const addTrackBtn = document.querySelector("#add_track_btn")

function createTrackInput(index) {
    const inputGroup = document.createElement('span');
    inputGroup.className = "input-group mb-2";
    inputGroup.innerHTML = `
            <span class="input-group-text bg-dark text-white">${index}</span>
            <input type="text" class="form-control" placeholder="Track Title">
            <button type="button" class="btn btn-outline-secondary move-up-btn">↑</button>
            <button type="button" class="btn btn-outline-secondary move-down-btn">↓</button>
        `;
    inputGroup.querySelectorAll('button').forEach((btn) => {
        btn.classList.add("display-inline-blk")
        let inp = inputGroup.querySelector('input')
    })
    addTrackBtn.blur();
    inputGroup.querySelector('input').addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            trackCount++;
            const newTrackInput = createTrackInput(trackCount);
            trackContainer.appendChild(newTrackInput);
        }
    })
    return inputGroup;
}


addTrackBtn.addEventListener("click", () => {
    trackCount++;
    const newTrackInput = createTrackInput(trackCount);
    trackContainer.appendChild(newTrackInput);
});

trackContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains('move-up-btn')) {
        moveTrackUp(e.target.closest('.input-group'));
    } else if (e.target.classList.contains('move-down-btn')) {
        moveTrackDown(e.target.closest('.input-group'));
    }
});

function moveTrackUp(track) {
    const prevTrack = track.previousElementSibling;
    if (prevTrack) {
        if (!prevTrack.classList.contains('btn')) {
            trackContainer.insertBefore(track, prevTrack);
            updateTrackNumbers();
        }
    }
}

function moveTrackDown(track) {
    const nextTrack = track.nextElementSibling;
    if (nextTrack) {
        trackContainer.insertBefore(nextTrack, track);
        updateTrackNumbers();
    }
}

function updateTrackNumbers() {
    Array.from(trackContainer.children).forEach((track, index) => {
        const trackFirstChild = track.children[0];
        console.log(trackFirstChild);
        if (trackFirstChild) {
            trackFirstChild.textContent = index;
        }
    });
}

// handle stars

stars.forEach(star => {
    star.addEventListener("click", () => {
        let i = stars.indexOf(star);
        starRating = i + 1;
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

let allSongs = {};


async function searchAlbum(searchParams = "") {
    try {
        const response = await fetch(`http://127.0.0.1:1982/find-album/${searchParams}`);

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
        const response = await fetch('http://127.0.0.1:1982/all-songs');

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
});