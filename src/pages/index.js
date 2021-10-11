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
import PopupConfirm from '../components/PopupConfirm';
import UserInfo from '../components/UserInfo.js';
import api from '../components/API';
import { settings, FormValidator } from '../components/FormValidator.js';

import {
  modalEditForm,
  modalAddCard,
  modalEditImage,
  editProfileBtn,
  deleteCardbtn,
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
  modalConfirmDelete,
} from '../utils/constants.js';

const openImagePopup = new PopupWithImage(modalImage);
const confirmDeletePopup = new PopupConfirm(modalConfirmDelete);
confirmDeletePopup.setEventListeners();
const user = new UserInfo(profileName, profileJob, profileImage);

const editFormValidator = new FormValidator(settings, modalEditForm);
const editImageFormValidator = new FormValidator(settings, modalEditImage);
const cardFormValidator = new FormValidator(settings, modalAddCard);

editFormValidator.enableValidation();
editImageFormValidator.enableValidation();
cardFormValidator.enableValidation();

api
  .getAllInfo()
  .then(([cards, user]) => {
    const generateCardInstance = (data) => {
      const cardInstance = new Card(data, cardTemplate, user._id, {
        handleCardClick: (evt) => openImagePopup.open(evt),
        handleCardDelete: (card_id) => {
          confirmDeletePopup.open();
          deleteCardbtn.addEventListener('click', () => {
            api.deleteCard(card_id).then(() => {
              cardInstance.deleteCard();
              confirmDeletePopup.close();
            });
          });
        },
      });
      return cardInstance;
    };

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

    const openAddCardForm = new PopupWithForm({
      popup: modalAddCard,
      handleSubmitForm: (data) => {
        api.addNewCard(data).then((res) => {
          cardList.prependItem(generateCardInstance(res).generateCard());
        });
      },
    });

    addCardBtn.addEventListener('click', () => {
      cardFormValidator.resetValidation();
      openAddCardForm.open();
    });
  })
  .catch((err) => console.log(err));

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

editProfileImageBtn.addEventListener('click', () => {
  editImageFormValidator.resetValidation();
  openImageEditForm.open();
});

editProfileBtn.addEventListener('click', () => {
  editFormValidator.resetValidation();
  const { name, job } = user.getUserInfo();
  document.querySelector(inputName).value = name;
  document.querySelector(inputJob).value = job;
  openProfileForm.open();
});
