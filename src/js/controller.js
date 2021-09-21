import 'core-js/stable';
import 'regenerator-runtime';

import * as model from './model.js';
import pokemonsView from './views/pokemonsView.js';
import pokemonView from './views/pokemonView.js';
import modalView from './views/modalView.js';
import searchView from './views/searchView.js';

/**
 * This function control a request for an API and render a pokemons cards
 * @param {number} offset The amount of request is based on this value
 */
const controlerPokemons = async function (offset) {
  try {
    pokemonsView.showSpinner();

    // 1 - Get pokemons
    await model.loadPokemons(offset);

    if (!model.state.pokemons.length) {
      pokemonsView.hiddenSpinner();
      return;
    }

    // 2 - Render cards pokemons
    pokemonsView.render(model.state.pokemons);
  } catch (err) {
    console.error(err);
    modalView.renderError(err.message);
  }
};

/**
 * This function control a request for an API and render a pokemon on modal window
 * @param {string | undefined} query
 * @param {string} url
 */
const controlerPokemon = async function (query, url) {
  try {
    // 0 - Show modal
    modalView.toggleClassModal();

    // 1 - Get pokemon
    await model.loadPokemon(query, url);

    // 2 - Render pokemon
    pokemonView.render(model.state.pokemon);

    // 3 - Add handler modal
    modalView.addHandlerModal();
    pokemonView.addHandlerTabbed();
  } catch (err) {
    console.error(err);
    modalView.renderError('Pokemon not found');
  }
};

/**
 * This function filters pokemon names based on user input
 * @param {string} name Input pokemon name
 * @returns {undefined}
 */
const controlerSearchNames = function (name) {
  if (!name) {
    searchView.clear();
    return;
  }

  // Clear previous Search
  searchView.clear();

  // Filter names
  const results = model.state.allNamesPokemons.filter(pokemonName =>
    pokemonName.includes(name)
  );

  if (!results.length) return;

  // Render names in the DOM and show list name
  searchView.render(results);
  searchView.showNames();
};

const init = function () {
  pokemonsView.addHandlerLoad(controlerPokemons);
  pokemonsView.addHandlerFetchPokemons(controlerPokemons);
  pokemonsView.addHandlerClick(controlerPokemon);
  searchView.addHandlerSearch(controlerPokemon);
  searchView.addHandlerSearchKeyUp(controlerSearchNames);
  searchView.addHandlerClickOnName(controlerPokemon);
};

init();
