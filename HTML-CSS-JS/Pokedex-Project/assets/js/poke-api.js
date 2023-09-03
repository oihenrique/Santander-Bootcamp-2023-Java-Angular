const pokeApi = {};

function mapPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types; // types.get[0]

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

async function getAboutPokemon(pokemonId) {
  try {
    const aboutInfoResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const aboutInfo = await aboutInfoResponse.json();

    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
    const speciesJson = await speciesResponse.json();
    const species = speciesJson.genera[7].genus.split(' ')[0];

    const about = new About();
    about.species = species;
    about.height = (aboutInfo.height) / 10 + " m";
    about.weight = (aboutInfo.weight) / 10 + " kg";
    about.abilities = aboutInfo.abilities.slice(0, 3).map((abilitySlot) => abilitySlot.ability.name);
    about.shape = speciesJson.shape.name;
    about.eggGroup = speciesJson.egg_groups.slice(0, 2).map((eggSlot) => eggSlot.name);
    about.growthRate = speciesJson.growth_rate.name;

    return about;
  } catch (error) {
    console.error(error);
  }
}

async function getPokemonStats(pokemonId) {
  try {
    const statsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const statsInfo = await statsResponse.json();

    const stats = new Stats();
    stats.hp = statsInfo.stats[0].base_stat;
    stats.attack = statsInfo.stats[1].base_stat;
    stats.defense = statsInfo.stats[2].base_stat;
    stats.specialAttack = statsInfo.stats[3].base_stat;
    stats.specialDefense = statsInfo.stats[4].base_stat;
    stats.speed = statsInfo.stats[5].base_stat;

    return stats;
  } catch (error) {
    console.log(error);
  }
}

async function getPokemonMoves(pokemonId) {
  const movesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).then((moves) => moves.json());

  const moves = new Moves();

  moves.move1 = movesResponse.moves[0].move.name;
  moves.move2 = movesResponse.moves[2].move.name;
  moves.move3 = movesResponse.moves[3].move.name;
  moves.move4 = movesResponse.moves[4].move.name;
  moves.move5 = movesResponse.moves[5].move.name;
  moves.move6 = movesResponse.moves[6].move.name;

  return moves;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(mapPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return (
    fetch(url)
      // um .then herda o resultado do then anterior
      .then((response) => response.json()) // converter o body para json
      .then((jsonBody) => jsonBody.results) // armazenando os results da requisição
      .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
      .then((detailRequests) => Promise.all(detailRequests))
      .catch((error) => console.error(error))
  );
};

pokeApi.getOnePokemon = (pokemonId) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

  return fetch(url)
    .then(response => response.json())
    .then(pokemonInfoHead => { return mapPokeApiDetailToPokemon(pokemonInfoHead) })
    .catch(error => console.log(error))
};