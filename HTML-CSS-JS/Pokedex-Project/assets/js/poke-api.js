const pokeApi = {};

pokeApi.getPokemonDetail = (pokemon) =>
  fetch(pokemon.url).then((response) => response.json());

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
