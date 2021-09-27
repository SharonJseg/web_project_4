import '../pages/index.css';
import logoSrc from '../images/logo.svg';
import profileImgSrc from '../images/profile_image.jpg';
import addImgSrc from '../images/add.svg';

document.querySelector('.logo').src = logoSrc;
document.querySelector('.profile__image').src = profileImgSrc;
document.querySelector('.add__icon').src = addImgSrc;

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
  modalImage,
  cardTemplate,
  cardsContainer,
  profileName,
  profileJob,
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';

export const openImagePopup = new PopupWithImage(modalImage);
export const user = new UserInfo(profileName, profileJob);

const openProfileForm = new PopupWithForm({
  popup: modalEditForm,
  handleSubmitForm: (userInfo) => {
    user.setUserInfo(userInfo);
  },
});

const openAddCardForm = new PopupWithForm({
  popup: modalAddCard,
  handleSubmitForm: (formData) => {
    const cardInstance = new Card(
      { text: formData.title, image: formData.url },
      cardTemplate
    );
    const cardElement = cardInstance.createCard();
    cardList.prependItem(cardElement);
  },
});

addCardBtn.addEventListener('click', () => {
  openAddCardForm.open({});
});

editProfileBtn.addEventListener('click', () => {
  const { name, job } = user.getUserInfo();
  openProfileForm.open({ name, job });
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
