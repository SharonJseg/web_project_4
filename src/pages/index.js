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
import API from '../components/API';
import { settings, FormValidator } from '../components/FormValidator.js';

import {
  modal,
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

const api = new API({
  address: 'https://around.nomoreparties.co/v1/',
  groupId: 'group-12',
  token: '9dab4619-413b-4914-b4f4-ee6c3c0ed983',
});

// api.getInitialCards();
// api.updateUserInfo();
// api.updateUserImage()
api.getUserInfo();

export const openImagePopup = new PopupWithImage(modalImage);
export const user = new UserInfo(profileName, profileJob);

const editFormValidator = new FormValidator(settings, modalEditForm);
const cardFormValidator = new FormValidator(settings, modalAddCard);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

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
    cardList.prependItem(generateCardInstance(data).generateCard());
  },
});

addCardBtn.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  openAddCardForm.open();
});

editProfileBtn.addEventListener('click', () => {
  editFormValidator.resetValidation();
  const { name, job } = user.getUserInfo();
  document.querySelector(inputName).value = name;
  document.querySelector(inputJob).value = job;
  openProfileForm.open();
});

const cardList = new Section(
  {
    items: api.getInitialCards(),
    renderer: (data) => {
      console.log(data);
      cardList.setItem(generateCardInstance(data).generateCard());
    },
  },
  cardsContainer
);

cardList.renderer();
