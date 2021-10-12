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
  profileName,
  profileJob,
  profileImage,
  inputName,
  inputJob,
  modalConfirmDelete,
} from '../utils/constants.js';
import loading from '../utils/loader.js';

const openImagePopup = new PopupWithImage(modalImage);

const editFormValidator = new FormValidator(settings, modalEditForm);
const editImageFormValidator = new FormValidator(settings, modalEditImage);
const cardFormValidator = new FormValidator(settings, modalAddCard);

editFormValidator.enableValidation();
editImageFormValidator.enableValidation();
cardFormValidator.enableValidation();

api
  .getAllInfo()
  .then(([cards, user]) => {
    const profile = new UserInfo(profileName, profileJob, profileImage);
    profile.setUserInfo(user);

    const confirmDeletePopup = new PopupWithForm({ popup: modalConfirmDelete });
    const generateCardInstance = (data) => {
      const cardInstance = new Card(data, cardTemplate, user._id, {
        handleCardClick: (title, image) => {
          openImagePopup.open(title, image);
        },
        handleCardDelete: (cardId) => {
          confirmDeletePopup.open();
          confirmDeletePopup.handleDelete(() => {
            api
              .deleteCard(cardId)
              .then(() => {
                cardInstance.deleteCard();
                confirmDeletePopup.close();
              })
              .catch((err) => console.log(err));
          });
        },
        handleCardLike: (cardId) => {
          const toggleLike = cardInstance.isLiked();
          if (toggleLike) {
            api.dislikeCard(cardId).then((number) => {
              cardInstance.dislikeCard();
              cardInstance.showNumOfLikes(number.likes.length);
            });
          } else {
            api
              .likeCard(cardId)
              .then((number) => {
                cardInstance.likeCard();
                cardInstance.showNumOfLikes(number.likes.length);
              })
              .catch((err) => console.log(err));
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
          })
          .catch((err) => console.log(err))
          .finally(() => loading(modalAddCard, false));
      },
    });

    addCardBtn.addEventListener('click', () => {
      cardFormValidator.resetValidation();
      openAddCardForm.open();
    });

    const openProfileForm = new PopupWithForm({
      popup: modalEditForm,
      handleSubmitForm: (userInfo) => {
        loading(modalEditForm, true);
        api
          .updateUserInfo(userInfo)
          .then((result) => {
            profile.setUserInfo(result);
          })
          .then(() => {
            openProfileForm.close();
          })
          .catch((err) => console.log(err))
          .finally(() => loading(modalEditForm, false));
      },
    });

    editProfileBtn.addEventListener('click', () => {
      editFormValidator.resetValidation();
      const { name, job } = profile.getUserInfo();
      inputName.value = name;
      inputJob.value = job;
      openProfileForm.open();
    });

    const openImageEditForm = new PopupWithForm({
      popup: modalEditImage,
      handleSubmitForm: (imageUrl) => {
        loading(modalEditImage, true);
        api
          .updateUserImage(imageUrl.avatar)
          .then((res) => {
            profile.setUserInfo(res);
          })
          .then(() => {
            openImageEditForm.close();
          })
          .catch((err) => console.log(err))
          .finally(() => {
            loading(modalEditImage, false);
          });
      },
    });

    editProfileImageBtn.addEventListener('click', () => {
      editImageFormValidator.resetValidation();
      openImageEditForm.open();
    });
  })
  .catch((err) => console.log(err));
