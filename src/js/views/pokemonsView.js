import { API_URL, OFFSET } from '../config';

class PokemonsView {
  _parentElement = document.querySelector('.container__pokemons');
  _spinner = this._parentElement.closest('.pokemons').querySelector('.loader-fetch');
  _data;

  /**
   * Render the recived object to the DOM
   * @param {Object[]} data The data to be rendered (e.g. pokemons)
   */
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  /**
   * generate a markup card
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
                  <h3 class="pokemon-id">${String(data.id).padStart(3, 0)}</h3>
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

  /**
   *
   * @param {string} type Name of the pokemon type
   * @returns {string} Return an HTML string
   */
  _generateMarkupTypePokemon(type) {
    return `<span class="pokemon-type pokemon-type--${type}">${type}</span>`;
  }

  showSpinner() {
    this._spinner.classList.remove('hidden');
  }

  hiddenSpinner() {
    this._spinner.classList.add('hidden');
  }

  /**
   * This function is called when the page is loaded.
   * @param {function} handler Function that fetch data from API
   */
  addHandlerLoad(handler) {
    window.addEventListener('load', handler());
  }

  /**
   * This function will be called every time there is an intersection in the loader spinner element
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

  addHandlerClick() {}
}

export default new PokemonsView();
