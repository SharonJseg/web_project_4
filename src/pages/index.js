import { openPopUp, closePopUp } from '../utils/utils.js';
import { settings, FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
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

editProfileBtn.addEventListener('click', openEditProfile);
addCardBtn.addEventListener('click', openAddCardPopup);
closeProfileBtn.addEventListener('click', closeEditProfilePopup);
closeAddCardModalBtn.addEventListener('click', closeAddCardPopup);
modalEditForm.addEventListener('submit', submitEditProfileForm);
modalImage
  .querySelector('.modal__close-btn')
  .addEventListener('click', closeImagePopup);

const submitCard = () => {
  const link = inputUrl.value;
  const name = inputTitle.value;
  const cardInstance = new Card({ link, name }, cardTemplate);
  cardsContainer.prepend(cardInstance.createCard({ name, link }));
  closePopUp(modalAddCard);
};

modalAddCard.addEventListener('submit', submitCard);
