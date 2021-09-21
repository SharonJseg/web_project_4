import { openPopUp, modalImage } from './utils.js';
class Card {
  constructor(data, template) {
    this._text = data.name;
    this._image = data.link;
    this._template = template;
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
      .addEventListener('click', this._openImageGallery);
  }

  createCard() {
    const cardElement = this._getTemplate();
    cardElement.querySelector('.card__image').src = this._image;
    cardElement.querySelector('.card__image').setAttribute('alt', this._text);
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

  _openImageGallery(evt) {
    openPopUp(modalImage);
    const modalLargeImage = modalImage.querySelector('.modal__image');
    const targetSrc = evt.target.parentElement
      .querySelector('.card__image')
      .getAttribute('src');
    const targetName =
      evt.target.parentElement.querySelector('.card__name').textContent;
    modalLargeImage.setAttribute('src', targetSrc);
    modalLargeImage.setAttribute('alt', targetName);
    modalImage.querySelector('.modal__title').textContent = targetName;
  }
}

export { Card };
