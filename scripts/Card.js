class Card {
    constructor(data, template) {
        this._text = data.name;
        this._image = data.link;
        this._template = template;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._template)
            .content.querySelector('.card__container').cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._cardElement.querySelector('.card__delete-button').addEventListener('click', this._deleteCard);
        this._cardElement.querySelector('.card__like-button').addEventListener('click', this._likeCard);
        this._cardElement.querySelector('.card__image').addEventListener('click', this._openImageGallery);
    }

    createCard() {
        this._cardElement = this._getTemplate()

        this._cardElement.querySelector('.card__image').src = this._image;
        this._cardElement.querySelector('.card__image').setAttribute('alt', this._text)
        this._cardElement.querySelector('.card__name').textContent = this._text;

        this._setEventListeners(this._cardElement);
        return this._cardElement;
    }

    _deleteCard(evt) {
        let deletedCard = evt.target.closest('.card__container');
        deletedCard.remove();
        deletedCard = null;
    }

    _likeCard(evt) {
        evt.target.classList.toggle('card__like-button_active');
    }

    _openImageGallery(evt) {
        openPopUp(modalImage);
        const modalLargeImage = modalImage.querySelector('.modal__image');
        const targetSrc = evt.target.parentElement.querySelector('.card__image').getAttribute('src');
        const targetName = evt.target.parentElement.querySelector('.card__name').textContent;
        modalLargeImage.setAttribute('src', targetSrc);
        modalLargeImage.setAttribute('alt', targetName);
        modalImage.querySelector('.modal__title').textContent = targetName;
    }
}

export { Card };