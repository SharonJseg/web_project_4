import { cardFormValidator } from '../pages/index.js';
import { modalImage } from './constants.js';
import { settings } from '../components/FormValidator.js';

const openPopUp = (popup) => {
  popup.classList.add('modal_opened');
  document.addEventListener('keydown', closePopUpWithKey);
  popup.addEventListener('click', closePopUpWithClickOnOverlay);
};

const closePopUp = (popup) => {
  document.removeEventListener('keydown', closePopUpWithKey);
  popup.removeEventListener('click', closePopUpWithClickOnOverlay);
  popup.classList.remove('modal_opened');
  cardFormValidator.resetValidation(popup, settings);
};

const closePopUpWithClickOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopUp(evt.currentTarget);
  }
};

const closePopUpWithKey = (evt) => {
  if (evt.key === 'Escape') {
    const activeModal = document.querySelector('.modal_opened');
    closePopUp(activeModal);
  }
};

export {
  modalImage,
  openPopUp,
  closePopUp,
  closePopUpWithClickOnOverlay,
  closePopUpWithKey,
};
