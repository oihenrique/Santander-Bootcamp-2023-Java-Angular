// Constantes globais
const maxRecords = 151;
const limit = 8;

// Variáveis globais
let offset = 0;
let currentPokemon = 0;

// Elementos do DOM
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const contentPage = document.querySelector(".content");
const pokemonDetailPage = document.querySelector(".pokemon-detailPage");
const pokemonInfoHead = document.querySelector(".pokemon-detailHead");
const pokemonDetailInfo = document.querySelector(".pokemon-detailInfo");
const detailInfo = document.getElementById("detailInfo");
const buttons = document.querySelectorAll(".liButton");
let aboutInfo = document.querySelector(".about");
let statsInfo = document.querySelector(".stats");


function generatePokemonInfoHead(pokemon) {
  pokemonInfoHead.className = `pokemon-detailHead ${pokemon.type}`;
  const nameInfoHead = document.createElement("h2");
  nameInfoHead.className = `name`;
  const nameNumberDiv = document.createElement('div');
  const detailDiv = document.createElement('div');
  nameNumberDiv.className = "nameNumberDiv";
  detailDiv.className = "detailHead";
  const typesInfoHead = document.createElement("ul");
  typesInfoHead.className = "typesInfoHead";
  const numberInfoHead = document.createElement("span");
  const imageInfoHead = document.createElement("img");


  nameInfoHead.textContent = pokemon.name;
  let typesList = pokemon.types.map((type) => type);
  typesInfoHead.innerHTML = typesList.map((type) => `<li>${type}</li>`).join("");
  numberInfoHead.textContent = `#${pokemon.number}`;
  imageInfoHead.src = pokemon.photo;

  nameNumberDiv.appendChild(nameInfoHead);
  nameNumberDiv.appendChild(numberInfoHead);
  pokemonInfoHead.appendChild(nameNumberDiv);
  detailDiv.appendChild(typesInfoHead);
  detailDiv.appendChild(imageInfoHead);
  pokemonInfoHead.appendChild(detailDiv);
}

function generateDetailButtons() {
  const buttonsHtml =
    `
  <div class="detailInfoButtons">
    <button type="button" class="detailInfoButton about">About</button>
    <button type="button" class="detailInfoButton stats">
      Base stats
    </button>
    <button type="button" class="detailInfoButton">Evolution</button>
    <button type="button" class="detailInfoButton">Moves</button>
  </div>`;

  pokemonDetailInfo.innerHTML = buttonsHtml;
}

function generatePokemonAboutInfo(pokemonId) {
  if (pokemonId == 0) {
    clearPokemonDetailInfo();
  } else {
    getAboutPokemon(pokemonId)
      .then((aboutInfo = []) => {
        detailInfo.className = "detailInfo";
        const aboutHtml =
          `
          <div class="detailItem">
              <p>Species</p>
              <p>${aboutInfo.species}</p>
            </div>
            <div class="detailItem">
              <p>Height</p>
              <p>${aboutInfo.height}</p>
            </div>
            <div class="detailItem">
              <p>Weight</p>
              <p>${aboutInfo.weight}</p>
            </div>
            <div class="detailItem">
              <p>Abilities</p>
              <p>${aboutInfo.abilities.join(', ')}</p>
            </div>
            <h4>Breeding</h4>
            <div>
            <div class="detailItem">
              <p>Shape</p>
              <p>${aboutInfo.shape}</p>
            </div>
            <div class="detailItem">
              <p>Egg group</p>
              <p>${aboutInfo.eggGroup.join(", ")}</p>
            </div>
            <div class="detailItem">
              <p>Growth rate</p>
              <p>${aboutInfo.growthRate}</p>
            </div>
          </div>
          `
        detailInfo.innerHTML += aboutHtml;
      })
  }
}

function generatePokemonStatsInfo(pokemonId) {
  if (pokemonId == 0) {
    clearPokemonDetailInfo();
  } else {
    getPokemonStats(pokemonId)
      .then((statsInfo) => {
        detailInfo.className = "detailInfoStats";
        const statsHtml =
          `
          <ul class="statItens">
            <li class="statItem">
              <p>HP</p>
              <p>${statsInfo.hp}</p>
            </li>
            <li class="statItem">
              <p>Attack</p>
              <p>${statsInfo.attack}</p>
            </li>
            <li class="statItem">
              <p>Defense</p>
              <p>${statsInfo.defense}</p>
            </li>
            <li class="statItem">
              <p>Special Attack</p>
              <p>${statsInfo.specialAttack}</p>
            </li>
            <li class="statItem">
              <p>Special Defense</p>
              <p>${statsInfo.specialDefense}</p>
            </li>
            <li class="statItem">
              <p>Speed</p>
              <p>${statsInfo.speed}</p>
            </li>
          </ul>
          `
        detailInfo.innerHTML += statsHtml;
      })
  }
}

function clearPokemonInfoHead() {
  pokemonInfoHead.innerHTML = "";
}

function clearPokemonDetailInfo() {
  detailInfo.innerHTML = "";
}

function loadPokemonInfoData(pokemonId) {
  currentPokemon = pokemonId;
  pokeApi.getOnePokemon(pokemonId)
    .then((pokemon) => {
      generatePokemonInfoHead(pokemon);
      generatePokemonAboutInfo(pokemonId);
    })
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) =>
      `
    <button type="button" class="liButton">  
    <li class="pokemon ${pokemon.type}">
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
        <ol class="types">
          ${pokemon.types
        .map((type) => `<li class="type ${type}">${type}</li>`)
        .join("")}
        </ol>

        <img
          src="${pokemon.photo}"
          alt="${pokemon.name}"
        />
      </div>
    </li>
    </button>`)
      .join("");
    pokemonList.innerHTML += newHtml;

    const buttons = document.querySelectorAll(".liButton");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const numberElement = button.querySelector(".number");
        const numero = numberElement.textContent;
        clearPokemonInfoHead();
        clearPokemonDetailInfo();
        loadPokemonInfoData(numero.substring(1));
      });
    });
  });
}

// Event Listeners
aboutInfo.addEventListener("click", () => {
  clearPokemonDetailInfo();
  generatePokemonAboutInfo(currentPokemon)
})

statsInfo.addEventListener("click", () => {
  clearPokemonDetailInfo();
  generatePokemonStatsInfo(currentPokemon);
})

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

// Inicialização
loadPokemonItens(offset, limit);