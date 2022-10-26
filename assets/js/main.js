const pokemonList = document.getElementById('pokemonList')
const pokemonDetail = document.getElementById('pokemonDetail')
const loadMoreButton = document.getElementById('loadMoreButton')
const sidenav = document.querySelector(".sidenav");
const url = 'https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json';
const maxRecords = 151
const limit = 12
let offset = 0;

const loadData = {}
fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => Object.assign(loadData, { data: jsonBody }));

const pokemonDetails = loadData;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-type="${pokemon.type}" data-id="${pokemon.number}" data-photo="${pokemon.photo}">
            <span class="number">#${pokemon.number}</span> 
            <span class="name">${pokemon.name}</span> 

            <div class="detail"> 
                <ol class="types"> 
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" 
                     alt="${pokemon.name}"> 
            </div> 
        </li> `
}

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

        const newHtml = pokemons.map(convertPokemonToLi).join('')

        pokemonList.innerHTML += newHtml
        const pokemoncard = document.querySelectorAll(".pokemon");

        pokemoncard.forEach(card => card.addEventListener('click', function openNav(e) {

            document.querySelector('.top').style.backgroundImage = "url(" + this.dataset.photo + ")";
            const detail = loadData.data.filter(
                (atrib) => atrib.id === Number(this.dataset.id)
              );
              showdetail(detail[0].name, detail[0].base,  detail[0].type )
           
            if (sidenav.classList.length == 1) {
                sidenav.classList.add(`${this.dataset.type}`)
            } else {
                sidenav.classList.remove(sidenav.classList[1])
                sidenav.classList.add(`${this.dataset.type}`)

            }
            document.getElementById("mySidenav").classList.add("active");
        }))
    })
}

function showdetail(name, e, type) {
    htmlDtail = `
                    <li class="active center">
                        <span class="date">${name.english}</span>
                       
                    </li>
                    <li class="active">
                        <span class="date">Attack</span>
                        <span class="lnr lnr-sun condition">
                            <span class="temp">${e.Attack}</span>
                        </span>
                    </li>
                    <li class="active">
                        <span class="date">Defense</span>
                        <span class="lnr lnr-sun condition">
                            <span class="temp"> ${e.Defense}</span>
                        </span>
                    </li>
                    <li>
                        <span class="date">HP</span>
                        <span class="lnr lnr-cloud condition">
                            <span class="temp">${e.HP}</span>
                        </span>
                     </li>
                     <li>
                        <span class="date">Sp.Attack: </span>
                        <span class="lnr lnr-cloud condition">
                            <span class="temp"> ${e['Sp. Attack']}</span>
                        </span>
                     </li>
                     <li>
                        <span class="date">Sp.Defense: </span>
                        <span class="lnr lnr-cloud condition">
                            <span class="temp">${e['Sp. Defense']}</span>
                        </span>
                     </li>
                     <li>
                        <span class="date">Speed</span>
                        <span class="lnr lnr-cloud condition">
                            <span class="temp"> ${e.Speed}</span>
                        </span>
                     </li> 
            `
    pokemonDetail.innerHTML = htmlDtail;
}

loadPokemonItens(offset, limit)

function closeNav() {
    document.getElementById("mySidenav").classList.remove("active");
    
}

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
