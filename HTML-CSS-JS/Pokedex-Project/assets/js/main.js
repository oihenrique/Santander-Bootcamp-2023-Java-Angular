const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const contentPage = document.querySelector(".content");
const pokemonDetailPage = document.querySelector(".pokemon-detailPage");
const pokemonInfoHead = document.querySelector(".pokemon-detailHead");
const buttons = document.querySelectorAll(".liButton");

let loadCount = 0;
const maxRecords = 151;
var newHeight = 95;
let offset = 0;
const limit = 8;

function clearPokemonInfoData() {
  pokemonInfoHead.innerHTML = "";
}

function loadPokemonInfoData(pokemonId) {
  pokeApi.getOnePokemon(pokemonId)
    .then((pokemon) => {
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
        clearPokemonInfoData();
        loadPokemonInfoData(numero.substring(1));
      });
    });
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordNextPage = offset + limit;

  if (loadCount == 0) {
    newHeight += 35;
  } else {
    newHeight += 55;
  }

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }

  contentPage.style.height = `${newHeight}vh`;
  loadCount += 1;
});