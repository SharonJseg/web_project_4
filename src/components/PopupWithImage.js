import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(evt) {
    super.open();
    const modalLargeImage = this._popup.querySelector('.modal__image');
    const targetSrc = evt.target.parentElement
      .querySelector('.card__image')
      .getAttribute('src');
    const targetName =
      evt.target.parentElement.querySelector('.card__name').textContent;
    modalLargeImage.setAttribute('src', targetSrc);
    modalLargeImage.setAttribute('alt', targetName);
    this._popup.querySelector('.modal__title').textContent = targetName;
  }
}
