function getGenerationSpec(genID, text){
    //console.log(event.target);
    let legendList = document.getElementById("legend-list")
    let genList = document.getElementById('generation-species')
    let title = document.getElementById('gen-name')
    // let like = document.getElementById('like-name')
    // console.log('like:', like)
    // toggleShow(like)
    legendList.innerHTML = '';
    title.innerText = text
    genList.innerHTML = '';
    // let legendButton = document.querySelector(".legend-button")
    //         legendButton.style.display = "block"
    //         legendButton.addEventListener('click', function(event){
    //             let legContent = document.getElementById("legend-list")
    //             let genSpec = document.getElementById('generation-species')
    //             legContent.style.display = "block"
    //             genSpec.style.display = "none"
    //         })
    // let legendButton = document.querySelector("legend-button")
    // toggleShow(legendButton)
    //let legendButton = document.querySelector("legend-button")
    //console.log("legend btn", document.getElementById("legend-button"))
    //toggleShow(legendButton)
    //console.log(event.target);
    fetch(`https://pokeapi.co/api/v2/generation/${genID}/`)
    .then(resp => resp.json())
    .then((gen) => {
        //console.log("gen:", gen)
        let genSpecies = gen.pokemon_species;
        //console.log("genSpecies:", genSpecies)
        const genList = document.getElementById('generation-species')
        let i;
        for (i = 0; i < genSpecies.length; i++) {
            findLegendary(genSpecies[i].name)
            const pokeLi = document.createElement("ul")
            const pokeText = document.createTextNode(genSpecies[i].name)
            //console.log(pokeText)
            pokeLi.appendChild(pokeText);
            genList.appendChild(pokeLi);
        }
        let legendButton = document.querySelector(".legend-button")
            legendButton.style.display = "block"
            legendButton.addEventListener('click', function(event){
                let legContent = document.getElementById("legend-list")
                let genSpec = document.getElementById('generation-species')
                legContent.style.display = "block"
                genSpec.style.display = "none"
            })
    })
}


function findLegendary(name){
    let legendList = document.getElementById("legend-list")
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    .then(resp => resp.json())
    .then(p => {
        if(p.is_legendary){
            const legLi = document.createElement("LI")
            const legText = document.createTextNode(name)
            legLi.appendChild(legText)
            legendList.appendChild(legLi)
        }
    })
}

document.addEventListener("DOMContentLoaded", () => {
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
            //const genText = document.createTextNode(name)
            //getLi.appendChild(legText)
            const genList = document.getElementById("gen-dropdown")
            genList.appendChild(genLi)
            //genLi.addEventListener('click', getGeneration(genLi.getAttribute("id"), genLi.innerText))
        }
        const genSelectors = document.querySelectorAll("div#gen-dropdown ul");
        console.log('genSelectors:', genSelectors)
        let s;
        for(s = 0; s < genSelectors.length; s++){
        let currSelect = genSelectors[s]
        console.log('currSelect:', currSelect)
        let currID = currSelect.getAttribute('id')
        let currText = currSelect.innerText
        currSelect.addEventListener('click', function(event){
            // console.log("event target:", event.target)
            // let legendButton = document.querySelector(".legend-button")
            // legendButton.style.display = "block"
            // legendButton.addEventListener('click', function(event){
            //     let legContent = document.getElementById("legend-content")
            //     let genSpec = document.getElementById('generation-species')
            //     legContent.style.display = "block"
            //     genSpec.style.display = "none"
            // })
            getGenerationSpec(currID, currText)
            // let legendButton = document.querySelector(".legend-button")
            // legendButton.style.display = "block"
            // legendButton.addEventListener('click', function(event){
            //     let legContent = document.getElementById("legend-list")
            //     let genSpec = document.getElementById('generation-species')
            //     legContent.style.display = "block"
            //     genSpec.style.display = "none"
            // })
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

// function toggleLegendButton() {
//     let legendButton = document.querySelector(".legend-button");
//     legendButton.style.display = "block"
// }
