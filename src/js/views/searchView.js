import View from './View';
import { API_URL } from '../config';

class SearchView extends View {
  _parentElement = document.querySelector('.list-names');

  _formElement = document.querySelector('.form-header');
  _inputElement = this._formElement.querySelector('input');

  /**
   * This method Get name pokemon or ID from the user input
   * @returns {string | number} Return a query of the input
   */
  _getQuery() {
    const inputValue = this._inputElement.value;

    const query = +inputValue || inputValue.toLowerCase().trim();

    this._clearInput();
    return query;
  }

  _clearInput() {
    this._formElement.querySelector('input').value = '';
  }

  clear() {
    this._parentElement.innerHTML = '';
  }

  showNames() {
    this._parentElement.style.display = 'block';
  }

  _hiddenNames() {
    this._parentElement.style.display = 'none';
  }

  /**
   * Generating a markup of pokemons names found
   * @returns {string} Return a HTML string
   */
  _generateMarkup() {
    return this._data.map(data => {
      return `
        <li class="item-name"><a href="${API_URL}${data}">${data}</a></li>
      `;
    });
  }

  // prettier-ignore
  /**
   * Handler that lets you get the input value every time a user types
   * @param {function} handler Function that filters names based on input value
   */
  addHandlerSearchKeyUp(handler) {
    this._inputElement.addEventListener('keyup',function () {
        const value = this._inputElement.value.toLowerCase().trim();

        this._hiddenNames();

        handler(value);
      }.bind(this)
    );
  }

  // prettier-ignore
  /**
   * Handler that allows the user to fetch a pokemon when submitting the form
   * @param {function} handler Function that fetches data about the Pokémon that the user is looking for
   */
  addHandlerSearch(handler) {
    this._formElement.addEventListener('submit', function (e) {
        e.preventDefault();

        const query = this._getQuery();

        handler(query);
      }.bind(this)
    );
  }

  // prettier-ignore
  /**
   * Handler that add an event of click on the list of pokemons that match with a user search
   * @param {function} handler This function will fetch data about the Pokémon and show it a modal window
   */
  addHandlerClickOnName(handler) {
    this._parentElement.addEventListener('click', function (e) {
        e.preventDefault();

        const anchorEl = e.target.closest('a');

        if (!anchorEl) return;

        const url = anchorEl.href;
        
        this.clear();
        this._hiddenNames();
        this._clearInput();

        handler(undefined, url);
      }.bind(this)
    );
  }
}

export default new SearchView();
