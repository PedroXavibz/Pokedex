import 'core-js/stable';
import 'regenerator-runtime';

import * as model from './model.js';
import pokemonsView from './views/pokemonsView.js';
import pokemonView from './views/pokemonView.js';
import modalView from './views/modalView.js';

/**
 * This function control a request for an API and render a pokemons cards
 * @param {number} offset The amount of request is based on this value
 */
const controlerPokemons = async function (offset) {
  try {
    pokemonsView.showSpinner();

    // 1 - Get pokemons
    await model.loadPokemons(offset);

    // 2 - Render cards pokemons
    pokemonsView.render(model.state.pokemons);

    pokemonsView.hiddenSpinner();
  } catch (err) {
    console.error(err);
  }
};

/**
 * This function control a request for an API and render a pokemon on modal window
 * @param {string | undefined} query
 * @param {string} url
 */
const controlerPokemon = async function (query, url) {
  // 0 - Show modal
  modalView.toggleClassModal();

  // 1 - Get pokemon
  await model.loadPokemon(query, url);

  // 2 - Render pokemon
  pokemonView.render(model.state.pokemon);

  // 3 - Add handler modal
  modalView.addHandlerModal();
  pokemonView.addHandlerTabbed();
};

const init = function () {
  pokemonsView.addHandlerLoad(controlerPokemons);
  pokemonsView.addHandlerFetchPokemons(controlerPokemons);
  pokemonsView.addHandlerClick(controlerPokemon);
};

init();
