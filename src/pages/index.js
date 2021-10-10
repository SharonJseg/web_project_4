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
import api from '../components/API';
import { settings, FormValidator } from '../components/FormValidator.js';

import {
  modalEditForm,
  modalAddCard,
  modalEditImage,
  editProfileBtn,
  editProfileImageBtn,
  addCardBtn,
  modalImage,
  cardTemplate,
  cardsContainer,
  profileName,
  profileJob,
  profileImage,
  inputName,
  inputJob,
} from '../utils/constants.js';

export const openImagePopup = new PopupWithImage(modalImage);
export const user = new UserInfo(profileName, profileJob, profileImage);

const editFormValidator = new FormValidator(settings, modalEditForm);
const editImageFormValidator = new FormValidator(settings, modalEditImage);
const cardFormValidator = new FormValidator(settings, modalAddCard);

editFormValidator.enableValidation();
editImageFormValidator.enableValidation();
cardFormValidator.enableValidation();

api.getInitialCards().then((cards) => {
  const cardList = new Section(
    {
      items: cards,
      renderer: (data) => {
        cardList.setItem(generateCardInstance(data).generateCard());
      },
    },
    cardsContainer
  );
  cardList.renderer();
});

api.getUserInfo().then((userInfo) => {
  user.setUserInfo(userInfo);
});

// change profile image
const openImageEditForm = new PopupWithForm({
  popup: modalEditImage,
  handleSubmitForm: (imageUrl) => {
    api.updateUserImage(imageUrl.avatar).then((res) => user.setUserInfo(res));
  },
});

//change profile text
const openProfileForm = new PopupWithForm({
  popup: modalEditForm,
  handleSubmitForm: (userInfo) => {
    api.updateUserInfo(userInfo).then((result) => user.setUserInfo(result));
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
    const test = api.addNewCard(data);
    console.log(test);
    cardList.prependItem(generateCardInstance(data).generateCard());
  },
});

editProfileImageBtn.addEventListener('click', () => {
  editImageFormValidator.resetValidation();
  openImageEditForm.open();
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

// const cardList = new Section(
//   {
//     items: api.getInitialCards(),
//     renderer: (data) => {
//       cardList.setItem(generateCardInstance(data).generateCard());
//     },
//   },
//   cardsContainer
// );

// cardList.renderer();
