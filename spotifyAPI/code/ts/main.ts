// Variables
const form: object = document.querySelector('#form')
const songName: object= document.querySelector('#songName') 
const container: object = document.querySelector('#display') 
const searchURL: string = "https://api.spotify.com/v1/search"
const recommendationsURL: string = "https://api.spotify.com/v1/recommendations"
const tokenURL: string = "https://accounts.spotify.com/api/token"
const key: string = "YzdhNzM0YmQ1ZDdkNGU0MDhmNWRjNjU4MTEyMTM4OWQ6N2VkMzkxZDNhOGZjNDcwYWEwNTM0YjIzZjljODAyZjg="


const searchSong = async (songName) => {
    const song:string = songName.replace(" ",  "%20").toLowerCase()
    let cards:string = `<div class="container">`
    
    try {
        //get a token
        let response = await fetch(tokenURL, {
            method: "POST",
            body: "grant_type=client_credentials"
            ,
            headers: {
                "Authorization" : "Basic "+key,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        let data = await response.json()
        const token:string = data["access_token"]

        //search the song requested by the user
        response = await fetch(searchURL + "?q=" + song +"&type=track", {
            method: "GET",
            headers: {
                "Authorization" : "Bearer "+token,
            }
        })
        data = await response.json()
        let songInfo = data["tracks"]["items"][0]
        cards += createCard(songInfo, false)

        //search for a recommendation
        response = await fetch(recommendationsURL + "?seed_tracks=" + songInfo["id"], {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + token,
            }
        })
        data = await response.json()
        songInfo = data["tracks"][Math.floor(Math.random() * 19)]
        cards += createCard(songInfo, true)

        container.innerHTML = cards + "</div>"

    } catch (error) {
        container.innerHTML = `<h2 class= "error"> Try another song please :) </h2> </div>`
    }

}

//create a single card for a song
const createCard = (songInfo, isRecommended) =>{
    const image:string = songInfo["album"]["images"][1]["url"]
    const album:string = songInfo["album"]["name"]
    const name:string= songInfo["name"]
    const artist:string = songInfo["artists"][0]["name"]
    const songURL:string = songInfo["external_urls"]["spotify"]
    const message : string = isRecommended? "Now, you should listen to": "Your input song was"
    return `
    <div class="card">
        <h2>${message}</h2>
        <div class="image">
            <figure>
                <img src="${image}" alt="User song">
            </figure>
        </div>
        <div class="info">
            <p class="song-name">${name} by ${artist}</p>
            <p class="album">${album}</p>
            <a href="${songURL}" class="song-link" target="_blank">Listen on Spotify</a> 
        </div>
    </div>
    `
}

// Event Listeners
form.addEventListener('submit', (event) => {
    event.preventDefault()
    if( songName.value.length > 0 ){
        searchSong(songName.value)
    }
})