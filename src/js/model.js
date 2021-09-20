import { getJSON } from './helpers';
import { API_URL, MAXIMUM_OFFSET } from './config';

export const state = {
  pokemons: [],
  pokemon: {},
  allNamesPokemons: [],
  search: {
    limit: 20,
    offset: 0,
    query: '',
  },
};

/**
 * Getting data from all pokemons based on offset value parameter
 * @param {number} offset Used for fetch a data from API
 */
export const loadPokemons = async function (offset = state.search.offset) {
  try {
    state.search.offset += offset;

    // 1 - Get data range based on offset value
    const data = await getJSON(
      `${API_URL}?limit=${state.search.limit}&offset=${state.search.offset}`
    );

    // 2 - In data get urls
    const arrUrls = data.results.map(d => d.url);

    // 3 - Fetching all data of each url
    const arrObjects = await Promise.all(arrUrls.map(async url => await getJSON(url)));

    // 4 - Data storage in pokemon array state
    state.pokemons = arrObjects.map(obj => {
      return {
        name: obj.name,
        id: obj.id,
        image: obj.sprites.other['official-artwork'].front_default,
        types: obj.types.map(t => t.type.name),
      };
    });
  } catch (err) {
    throw err;
  }
};

/**
 * This function get data from a specific pokemon either based a url or name.
 * @param {string | undefined} query A pokemon name or id, this parameter should be undefined if your search is done via a url
 * @param {string} url A url pokemon
 */
export const loadPokemon = async function (query = '', url) {
  try {
    // 1 - Get data
    const objPokemon = query ? await getJSON(`${API_URL}${query}`) : await getJSON(url);

    state.search.query = query;

    // 2 - Data storage in pokemon object state
    state.pokemon = {
      name: objPokemon.name,
      id: objPokemon.id,
      height: objPokemon.height,
      weight: objPokemon.weight,
      image: objPokemon.sprites.other['official-artwork'].front_default,
      ability: objPokemon.abilities[0].ability.name,
      stats: objPokemon.stats.map(s => {
        return {
          base: s.base_stat,
          name: s.stat.name,
        };
      }),
      types: objPokemon.types.map(t => t.type.name),
    };
  } catch (err) {
    throw err;
  }
};

(async function () {
  try {
    // 1 - Get all pokemons names
    const data = await getJSON(`${API_URL}?limit=${MAXIMUM_OFFSET}&offset=0`);

    // 2 - Data storage in allPokemonsName state
    state.allNamesPokemons = data.results.map(el => el.name);
  } catch (err) {
    console.error(err);
  }
})();
