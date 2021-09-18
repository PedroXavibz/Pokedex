import { getJSON } from './helpers';
import { API_URL } from './config';

export const state = {
  pokemons: [],
  search: {
    limit: 20,
    offset: 0,
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
