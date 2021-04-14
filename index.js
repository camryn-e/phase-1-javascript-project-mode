function getSpecies() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1118`)
    .then(resp => resp.json())
    .then((species) => {
        let allSpecies = species.results;
        console.log("all species:", allSpecies)
        const speciesList = document.getElementById('species-list')
        let i;
        for (i = 0; i < allSpecies.length; i++) {
            const pokeLi = document.createElement("ul")
            const pokeText = document.createTextNode(allSpecies[i].name)
            pokeLi.appendChild(pokeText);
            speciesList.appendChild(pokeLi);
        }
    })
}

function getGenerationSpec(genID, text){
    let genList = document.getElementById('generation-species')
    let title = document.getElementById('gen-name')
    title.innerText = text
    genList.innerHTML = '';
    const speciesList = document.getElementById('species-list')
    speciesList.innerHTML = '';
    fetch(`https://pokeapi.co/api/v2/generation/${genID}/`)
    .then(resp => resp.json())
    .then((gen) => {
        let genSpecies = gen.pokemon_species;
        const genList = document.getElementById('generation-species')
        let i;
        for (i = 0; i < genSpecies.length; i++) {
            const pokeLi = document.createElement("ul")
            const pokeText = document.createTextNode(genSpecies[i].name)
            pokeLi.appendChild(pokeText);
            genList.appendChild(pokeLi);
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
    getSpecies()
    generationGenerator()

    document.querySelector(".dropbtn").addEventListener('click', function(event){
        let drop = document.getElementById('gen-dropdown')
        toggleShow(drop)
    })
});

function generationGenerator(){
    fetch(`https://pokeapi.co/api/v2/generation/`)
    .then(resp => resp.json())
    .then(gens => {
        let genNames = gens.results
        let i;
        for(i = 0; i < genNames.length; i++){
            const genLi = document.createElement("UL")
            genLi.setAttribute("id", `${i + 1}`)
            genLi.innerText = genNames[i].name
            const genList = document.getElementById("gen-dropdown")
            genList.appendChild(genLi)
        }
        const genSelectors = document.querySelectorAll("div#gen-dropdown ul");
        console.log('genSelectors:', genSelectors)
        let s;
        for(s = 0; s < genSelectors.length; s++){
        let currSelect = genSelectors[s]
        console.log('currSelect:', currSelect)
        let currID = currSelect.getAttribute('id')
        let currText = currSelect.innerText
        currSelect.addEventListener('click', (event) => {
            getGenerationSpec(currID, currText)
        })
    }
    })
}

function toggleShow(elem) {
    if (elem.style.display === "none") {
        elem.style.display = "block";
    } else {
        elem.style.display = "none";
    }
}
