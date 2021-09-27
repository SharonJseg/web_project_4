import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector('.modal__image');
    this._title = this._popup.querySelector('.modal__title');
  }

  open(evt) {
    super.open();
    const targetSrc = evt.target.parentElement
      .querySelector('.card__image')
      .getAttribute('src');
    const targetName =
      evt.target.parentElement.querySelector('.card__name').textContent;
    this._image.setAttribute('src', targetSrc);
    this._image.setAttribute('alt', targetName);
    this._title.textContent = targetName;
  }
}
