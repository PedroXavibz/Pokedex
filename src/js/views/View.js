export default class View {
  _parentElement;
  _data;

  /**
   * Render the recived object to the DOM
   * @param {object | object[]} data The data to be rendered (e.g. pokemons)
   */
  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  /**
   * Generating a markup of type pokemon
   * @param {string} type Name of the pokemon type
   * @returns {string} Return an HTML string
   */
  _generateMarkupTypePokemon(type) {
    return `<span class="pokemon-type pokemon-type--${type}">${type}</span>`;
  }
}
