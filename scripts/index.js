import { openPopUp, closePopUp } from './utils.js';
import { settings, FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import initialCards from './initialCards.js';

const imageForm = document.querySelector('#image-form');
const modalEditForm = document.querySelector('.modal_type_edit-profile');
const modalAddCard = document.querySelector('.modal_type_add-element');
export const modalImage = document.querySelector('.modal_type_image');

const editProfileBtn = document.querySelector('.profile__edit-btn');
const closeProfileBtn = modalEditForm.querySelector('.modal__close-btn');
const closeAddCardModalBtn = modalAddCard.querySelector('.modal__close-btn');
const addCardBtn = document.querySelector('.profile__add-element-btn');

const inputName = modalEditForm.querySelector('.form__text-input_type_name');
const inputJob = modalEditForm.querySelector('.form__text-input_type_job');
const inputTitle = modalAddCard.querySelector('.form__text-input_type_title');
const inputUrl = modalAddCard.querySelector('.form__text-input_type_url');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards__container');

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

initialCards.forEach((card) => {
  const cardInstance = new Card(card, cardTemplate);
  const cardElement = cardInstance.createCard();
  cardsContainer.append(cardElement);
});

const submitCard = () => {
  const link = inputUrl.value;
  const name = inputTitle.value;
  const cardInstance = new Card({ link, name }, cardTemplate);
  cardsContainer.prepend(cardInstance.createCard({ name, link }));
  closePopUp(modalAddCard);
};

modalAddCard.addEventListener('submit', submitCard);
