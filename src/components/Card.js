export default class Card {
  constructor(
    data,
    template,
    userId,
    { handleCardClick, handleCardDelete, handleCardLike }
  ) {
    this._text = data.name;
    this._image = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._userId = userId;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
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
      .addEventListener('click', () => {
        this._handleCardLike(this._id);
      });
    this._cardElement
      .querySelector('.card__image')
      .addEventListener('click', this._handleCardClick);
  }

  _setAttributes(cardElement, attribs) {
    for (const key in attribs) {
      cardElement.setAttribute(key, attribs[key]);
    }
  }

  showNumOfLikes(number) {
    this._cardElement.querySelector('.card__likes').textContent = number;
  }

  _displayDeleteButton() {
    if (this._userId != this._ownerId) {
      this._cardElement.querySelector('.card__delete-button').style.display =
        'none';
    }
  }

  isCardLiked() {
    this._likes.forEach((like) =>
      like._id === this._userId ? this.likeCard() : this.dislikeCard()
    );
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this.likeIcon = this._cardElement.querySelector('.card__like-button');
    this._setAttributes(this._cardElement.querySelector('.card__image'), {
      src: this._image,
      alt: this._text,
    });
    this._displayDeleteButton();
    this.showNumOfLikes(this._likes.length);
    this._cardElement.querySelector('.card__name').textContent = this._text;
    this._setEventListeners(this.cardElement);
    this.isCardLiked();
    return this._cardElement;
  }

  likeCard() {
    this.likeIcon.classList.add('card__like-button_active');
  }

  dislikeCard() {
    this.likeIcon.classList.remove('card__like-button_active');
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _likeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }
}
