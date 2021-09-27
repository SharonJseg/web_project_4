import '../pages/index.css';
import logoSrc from '../images/logo.svg';
import profileImgSrc from '../images/profile_image.jpg';
import addImgSrc from '../images/add.svg';

document.querySelector('.logo').src = logoSrc;
document.querySelector('.profile__image').src = profileImgSrc;
document.querySelector('.profile-icon').src = addImgSrc;

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { settings, FormValidator } from '../components/FormValidator.js';

import {
  initialCards,
  modalEditForm,
  modalAddCard,
  editProfileBtn,
  addCardBtn,
  modalImage,
  cardTemplate,
  cardsContainer,
  profileName,
  profileJob,
  inputName,
  inputJob,
} from '../utils/constants.js';

export const openImagePopup = new PopupWithImage(modalImage);
export const user = new UserInfo(profileName, profileJob);

const editFormValidator = new FormValidator(settings, modalEditForm);
const cardFormValidator = new FormValidator(settings, modalAddCard);

const openProfileForm = new PopupWithForm({
  popup: modalEditForm,
  handleSubmitForm: (userInfo) => {
    user.setUserInfo(userInfo);
  },
});

const generateCardInstance = (data) => {
  const cardInstance = new Card(data, cardTemplate, {
    handleCardClick: (evt) => openImagePopup.open(evt),
  });
  return cardInstance;
};

const openAddCardForm = new PopupWithForm({
  popup: modalAddCard,
  handleSubmitForm: (data) => {
    const cardInstance = generateCardInstance(data);
    const cardElement = cardInstance.generateCard();
    cardList.prependItem(cardElement);
  },
});

addCardBtn.addEventListener('click', () => {
  cardFormValidator.enableValidation();
  cardFormValidator.resetValidation();
  openAddCardForm.open({});
});

editProfileBtn.addEventListener('click', () => {
  editFormValidator.enableValidation();
  editFormValidator.resetValidation();
  const data = user.getUserInfo();
  const { name, job } = data;
  document.querySelector(inputName).value = name;
  document.querySelector(inputJob).value = job;
  openProfileForm.open();
});

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const cardInstance = generateCardInstance(data);
      const cardElement = cardInstance.generateCard();
      cardList.setItem(cardElement);
    },
  },
  cardsContainer
);

cardList.renderer();
