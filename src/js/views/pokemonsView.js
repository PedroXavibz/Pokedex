import { API_URL, OFFSET } from '../config';
import View from './View';

class PokemonsView extends View {
  _parentElement = document.querySelector('.container__pokemons');
  _spinner = this._parentElement.closest('.pokemons').querySelector('.loader-fetch');

  /**
   * Generating a markup card
   * @returns {string} Return an HTML string, this string will be rendered in the DOM
   */
  _generateMarkup() {
    return this._data
      .map(data => {
        return `
        <li class="card-pokemon">
            <a href="${API_URL}${data.name}">
              <figure class="card-pokemon--img">
                <img
                  src="${data.image}"
                  alt="${data.name} pokemon image"
                />
                <figcaption class="card-pokemon--description">
                  <h2 class="pokemon-name">${data.name}</h2>
                  <h3 class="pokemon-id">ID ${String(data.id).padStart(3, 0)}</h3>
                  <div class="container__type">
                    ${data.types.map(this._generateMarkupTypePokemon).join('')}
                  </div>
                </figcaption>
              </figure>
            </a>
        </li>
        `;
      })
      .join('');
  }

  showSpinner() {
    this._spinner.classList.remove('hidden');
  }

  hiddenSpinner() {
    this._spinner.classList.add('hidden');
  }

  /**
   * This method is called when the page is loaded.
   * @param {function} handler Function that fetch data from API
   */
  addHandlerLoad(handler) {
    window.addEventListener('load', handler());
  }

  /**
   * This method will execute the function passed as argument every time there is an intersection in the loader element.
   * @param {function} handler Function that fetch data pokemon
   */
  addHandlerFetchPokemons(handler) {
    // Handler observer
    const getMoreData = function (entries) {
      const [entry] = entries;

      if (!entry.isIntersecting) return;

      // Fetching data based on offset value
      handler(OFFSET);
    };

    // Observing the spinner element
    const observerContainerPokemons = new IntersectionObserver(getMoreData, {
      root: null,
      threshold: 0.1,
    });
    observerContainerPokemons.observe(this._spinner);
  }

  /**
   * This method allows you to fetch a Pokémon by clicking on its card.
   * @param {function} handler Function that fetch data pokemon
   */
  addHandlerClick(handler) {
    // Get pokemon url on click
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();

      // Get anchor element
      const anchorEl = e.target.closest('a');

      if (!anchorEl) return;

      const url = anchorEl.href;

      // Get data
      handler(undefined, url);
    });
  }
}

export default new PokemonsView();
