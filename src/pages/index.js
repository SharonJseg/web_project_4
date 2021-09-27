import { openPopUp, closePopUp } from '../utils/utils.js';
import { settings, FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

import {
  initialCards,
  modalEditForm,
  modalAddCard,
  editProfileBtn,
  addCardBtn,
  closeProfileBtn,
  closeAddCardModalBtn,
  modalImage,
  cardTemplate,
  cardsContainer,
} from '../utils/constants.js';

export const openImagePopup = new PopupWithImage(modalImage);

const openProfileForm = new PopupWithForm({
  popup: modalEditForm,
  handleSubmitForm: (formData) => {
    // console.log(formData);
  },
});

addCardBtn.addEventListener('click', () => {
  openAddCardForm.open();
});

editProfileBtn.addEventListener('click', () => {
  openProfileForm.open();
});

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardInstance = new Card(item, cardTemplate);
      const cardElement = cardInstance.createCard();
      cardList.setItem(cardElement);
    },
  },
  cardsContainer
);

cardList.renderer();

const openAddCardForm = new PopupWithForm({
  popup: modalAddCard,
  handleSubmitForm: (formData) => {
    console.log(formData);
    const cardInstance = new Card(
      { text: formData.title, image: formData.url },
      cardTemplate
    );
    const cardElement = cardInstance.createCard();
    console.log('cardelement:', cardInstance);
    cardList.prependItem(cardElement);
  },
});

const profileFormValidator = new FormValidator(settings, modalEditForm);
export const cardFormValidator = new FormValidator(settings, modalAddCard);

profileFormValidator.enableValidation(settings);
cardFormValidator.enableValidation(settings);

const openEditProfile = () => {
  openPopUp(modalEditForm);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
};

const openAddCardPopup = () => {
  openPopUp(modalAddCard);
  imageForm.reset();
};

const closeEditProfilePopup = () => {
  closePopUp(modalEditForm);
};

const closeAddCardPopup = () => {
  closePopUp(modalAddCard);
};

const closeImagePopup = () => {
  closePopUp(modalImage);
};

const submitEditProfileForm = () => {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closeEditProfilePopup();
};
