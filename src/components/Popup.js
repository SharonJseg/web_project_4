import { togglePopupClass, closePopupButton } from '../utils/constants.js';

export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add(togglePopupClass);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove(togglePopupClass);
    this.removeEventListeners();
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close(this._popup);
    }
  };

  _handleCloseButton = () => {
    this.close();
  };

  _handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup
      .querySelector(closePopupButton)
      .addEventListener('click', this._handleCloseButton);
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOverlayClose);
  }

  removeEventListeners() {
    this._popup
      .querySelector(closePopupButton)
      .removeEventListener('click', this._handleCloseButton);
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOverlayClose);
  }
}
