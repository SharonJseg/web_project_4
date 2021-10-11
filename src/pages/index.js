import '../pages/index.css';
import logoSrc from '../images/logo.svg';
import profileImgSrc from '../images/profile_image.png';
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
  profileName,
  profileJob,
  profileImage,
  inputName,
  inputJob,
  modalConfirmDelete,
} from '../utils/constants.js';
import loading from '../utils/loader.js';

const openImagePopup = new PopupWithImage(modalImage);
const confirmDeletePopup = new PopupConfirm(modalConfirmDelete);

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
          loading(modalConfirmDelete, false);
          confirmDeletePopup.open();
          deleteCardbtn.addEventListener('click', () => {
            loading(modalConfirmDelete, true);
            api.deleteCard(card_id).then(() => {
              cardInstance.deleteCard();
              confirmDeletePopup.close();
            });
          });
        },
        handleCardLike: (card_id) => {
          if (
            !cardInstance.likeIcon.classList.contains(
              'card__like-button_active'
            )
          ) {
            api.likeCard(card_id).then((number) => {
              cardInstance.likeCard();
              cardInstance.showNumOfLikes(number.likes.length);
            });
          } else {
            api.dislikeCard(card_id).then((number) => {
              cardInstance.dislikeCard();
              cardInstance.showNumOfLikes(number.likes.length);
            });
          }
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
      '.cards__container'
    );
    cardList.renderer();

    const openAddCardForm = new PopupWithForm({
      popup: modalAddCard,
      handleSubmitForm: (data) => {
        loading(modalAddCard, true);
        api
          .addNewCard(data)
          .then((res) => {
            cardList.prependItem(generateCardInstance(res).generateCard());
          })
          .then(() => {
            openAddCardForm.close();
          });
      },
    });

    addCardBtn.addEventListener('click', () => {
      cardFormValidator.resetValidation();
      loading(modalAddCard, false);
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
    loading(modalEditImage, true);
    api
      .updateUserImage(imageUrl.avatar)
      .then((res) => {
        user.setUserInfo(res);
      })
      .then(() => {
        openImageEditForm.close();
      });
  },
});

editProfileImageBtn.addEventListener('click', () => {
  editImageFormValidator.resetValidation();
  loading(modalEditImage, false);
  openImageEditForm.open();
});

//change profile text
const openProfileForm = new PopupWithForm({
  popup: modalEditForm,
  handleSubmitForm: (userInfo) => {
    loading(modalEditForm, true);
    api
      .updateUserInfo(userInfo)
      .then((result) => user.setUserInfo(result))
      .then(() => {
        openProfileForm.close();
      });
  },
});

editProfileBtn.addEventListener('click', () => {
  editFormValidator.resetValidation();
  loading(modalEditForm, false);
  const { name, job } = user.getUserInfo();
  document.querySelector(inputName).value = name;
  document.querySelector(inputJob).value = job;
  openProfileForm.open();
});
