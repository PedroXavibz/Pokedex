import 'core-js/stable';
import 'regenerator-runtime';

import * as model from './model.js';
import pokemonsView from './views/pokemonsView.js';

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

const init = function () {
  pokemonsView.addHandlerLoad(controlerPokemons);
  pokemonsView.addHandlerFetchPokemons(controlerPokemons);
};

init();
