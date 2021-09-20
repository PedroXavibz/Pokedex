import View from './View';

class PokemonView extends View {
  _parentElement = document.querySelector('.modal');

  /**
   * Generating a markup that will be rendered in the modal window
   * @returns
   */
  _generateMarkup() {
    return `
        <div class="left">
            <figure>
                <img src="${this._data.image}" alt="${this._data.name} pokemon image" />
            </figure>
        </div>

        <div class="right">
            <div class="tabbed">
              <div class="tabbed__buttons">
                <button class="btn btn-tabbed--1 btn--active" data-tabbed="1">
                  <i class="fas fa-info-circle"></i>
                </button>
                <button class="btn btn-tabbed--2" data-tabbed="2">
                  <i class="fas fa-chart-bar"></i>
                </button>
              </div>

              <div class="container-tabbed tabbed--1 tabbed--active">
                <h1 class="pokemon-name">${this._data.name}</h1>
                <div class="container__type">
                  ${this._data.types.map(this._generateMarkupTypePokemon).join('')}
                </div>
                <div class="container__info">
                  <ul>
                    <li class="type-height">Height<br />${this._data.height / 10}m</li>
                    <li class="type-weight">Weight<br />${this._data.weight / 10}kg</li>
                  </ul>
                  <ul>
                    <li class="type-id">ID<br />${String(this._data.id).padStart(3, 0)}</li>
                    <li class="type-ability">ability<br />${this._data.ability}</li>
                  </ul>
                </div>
              </div>

              <div class="container-tabbed tabbed--2">
               ${this._data.stats.map(this._generateMarkupStats).join('')}
              </div>
            </div>
        </div>
        <button class="btn btn--close close--modal">
          <i class="fas fa-times"></i>
        </button>
        `;
  }

  /**
   * Generating a markup of stats pokemon
   * @param {object} s Object that contains all data about pokemons statistics
   * @returns Return a HTML string
   */
  _generateMarkupStats(s) {
    return `
      <div class="status status--${s.name}">
        <h1>${s.name.toUpperCase()}: ${s.base}</h1>
      </div>
      `;
  }

  addHandlerTabbed() {
    const containerBtns = this._parentElement.querySelector('.tabbed__buttons');

    // Handler tabbed
    const showTabbed = function (tabbed) {
      // Get all tabbed components
      const tabbeds = containerBtns.closest('.tabbed').querySelectorAll('.container-tabbed');

      tabbeds.forEach(t => {
        if (t.classList.contains(`tabbed--${tabbed}`)) {
          t.classList.add('tabbed--active');
        } else {
          t.classList.remove('tabbed--active');
        }
      });
    };

    // Change button on click
    containerBtns.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn');

      if (!btn) return;

      containerBtns
        .querySelectorAll('.btn')
        .forEach(btn => btn.classList.remove('btn--active'));

      btn.classList.add('btn--active');

      const { tabbed } = btn.dataset;

      // Display tabbed on click
      showTabbed(+tabbed);
    });
  }
}

export default new PokemonView();
