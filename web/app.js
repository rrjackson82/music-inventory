let baseUrl = "http://127.0.0.1:5000";
const placeholder = document.querySelector("#placeholder");

placeholder.textContent = "HI"
// fetch('http://127.0.0.1:5000/all-songs')
//     .then(response => {
//         if (response.ok) {
//             return response.json()
//         } else {
//             throw new Error('API Request Failed')
//         }
//     })
//     .then(data => {
//         console.log(data)
//     })
//     .catch(error => {
//         console.log(error)
//     })

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

fetchData().then(data => {
    if (data) {
        let output = ""
        console.log(data);
        data.forEach(album => {
            output = output + " " + album.title
        })
        placeholder.textContent = output
    }
})