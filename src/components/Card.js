export default class Card {
  constructor(data, template, userId, { handleCardClick, handleCardDelete }) {
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._userId = userId;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const cardElement = this._template
      .querySelector('.card__container')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector('.card__delete-button')
      .addEventListener('click', () => {
        this._handleCardDelete(this._id);
      });
    this._cardElement
      .querySelector('.card__like-button')
      .addEventListener('click', this._likeCard);
    this._cardElement
      .querySelector('.card__image')
      .addEventListener('click', this._handleCardClick);
  }

  _setAttributes(cardElement, attribs) {
    for (const key in attribs) {
      cardElement.setAttribute(key, attribs[key]);
    }
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setAttributes(this._cardElement.querySelector('.card__image'), {
      src: this._image,
      alt: this._text,
    });
    this._cardElement.querySelector('.card__likes').textContent =
      this._likes.length;

    if (this._userId != this._ownerId) {
      this._cardElement.querySelector('.card__delete-button').style.display =
        'none';
    }

    this._cardElement.querySelector('.card__name').textContent = this._text;
    this._setEventListeners(this.cardElement);
    return this._cardElement;
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _likeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }
}
