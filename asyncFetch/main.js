// variables

const container = document.getElementById('container')

// funciones

const callAPI = async () => {
    const res = await fetch('https://rickandmortyapi.com/api/character/?page=1')
    const data = await res.json()
    const characters = data.results

    const result = characters
        .map(character => createCard(character))
        .join(' ')
        

    container.innerHTML = result
}

const createCard = ({ image, name, species, location, gender, status}) => {
    const genderIcon = (gender === "Female")? "fa fa-venus" : (gender === "Male")? "fa fa-mars": "fa fa-genderless" 
    const statusIcon = (status === "Alive")? "fa fa-check" : (status === "Dead")? "fa fa-times": "fa fa-question" 
    return `
    <div class="card">
        <img src="${image}" alt="${name}">
        <div class="content">
            <p class="species">${species}</p>
            <h3 clas="title">${name}</h3>
            <p class="info"><i class="fa fa-globe" aria-hidden="true"></i> ${location.name}</p>
            <p class="info"><i class="${genderIcon}" aria-hidden="true"></i> ${gender}</p>
            <p class="info ${status}"><i class="${statusIcon}" aria-hidden="true"></i> ${status}</p>
        </div>
    </div>
    `
}

// ejecuta la funcion en cuanto carga el archivo
callAPI()