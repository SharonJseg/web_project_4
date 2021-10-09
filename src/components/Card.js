export default class Card {
  constructor(data, template, { handleCardClick }) {
    this._text = data.name;
    this._image = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = this._template
      .querySelector('.card__container')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners(cardElement) {
    cardElement
      .querySelector('.card__delete-button')
      .addEventListener('click', this._deleteCard);
    cardElement
      .querySelector('.card__like-button')
      .addEventListener('click', this._likeCard);
    cardElement
      .querySelector('.card__image')
      .addEventListener('click', this._handleCardClick);
  }

  _setAttributes(cardElement, attribs) {
    for (const key in attribs) {
      cardElement.setAttribute(key, attribs[key]);
    }
  }

  generateCard() {
    const cardElement = this._getTemplate();
    this._setAttributes(cardElement.querySelector('.card__image'), {
      src: this._image,
      alt: this._text,
    });
    cardElement.querySelector('.card__name').textContent = this._text;
    this._setEventListeners(cardElement);
    return cardElement;
  }

  _deleteCard(evt) {
    let cardToDelete = evt.target.closest('.card__container');
    cardToDelete.remove();
    cardToDelete = null;
  }

  _likeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }
}
