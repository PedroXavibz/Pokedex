import img from '../../img/error-img.jfif';

class ModalView {
  _parentElement = document.querySelector('.modal');
  _ovelay = document.querySelector('.overlay');

  /**
   * Render a error message on modal window
   * @param {string} message (e.g. pokemon not found)
   */
  renderError(message) {
    this._clear();
    const markup = this._generateMarkupError(message);
    this._parentElement.insertAdjacentHTML('beforeend', markup);
    this.addHandlerModal();
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  /**
   * Generating a markup modal error
   * @param {string} message
   * @returns Return a HTML string
   */
  _generateMarkupError(message) {
    return `
    <div class="error-message">
      <figure>
        <img src="${img}" alt="pikachu image" />
        <figcaption>
          <i class="fas fa-exclamation-triangle"></i>
          <h1>Something went wrong 😶</h1>
          <p class="message">💥 ${message} 💥</p>
          <button class="btn close--modal btn-close-err">Try again 🔄</button>
        </figcaption>
      </figure>
    </div>
    `;
  }

  toggleClassModal() {
    this._clear();
    this._parentElement.classList.toggle('hidden');
    this._ovelay.classList.toggle('hidden');
  }

  _handlerKey(e) {
    const esc = e.key === 'Escape';
    if (esc && !this._parentElement.classList.contains('hidden')) {
      this.toggleClassModal();
    }
  }

  addHandlerModal() {
    const closeButton = this._parentElement.querySelector('.close--modal');
    closeButton.addEventListener('click', this.toggleClassModal.bind(this));
    window.addEventListener('keydown', this._handlerKey.bind(this));
  }
}

export default new ModalView();
