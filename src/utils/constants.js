export const initialCards = [
  {
    title: 'Yosemite Valley',
    url: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2103&q=80',
  },
  {
    title: 'Lake Louise',
    url: 'https://images.unsplash.com/photo-1581088382991-83c7f170de75?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
  },
  {
    title: 'Bald Mountains',
    url: 'https://images.unsplash.com/photo-1601025252036-36faf914679d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2001&q=80',
  },
  {
    title: 'Latemar',
    url: 'https://images.unsplash.com/photo-1539540706191-b673a0a5b6d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
  },
  {
    title: 'Vanoise National Park',
    url: 'https://images.unsplash.com/photo-1549752448-38f4d94420f5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    title: 'Lago di Braies',
    url: 'https://images.unsplash.com/photo-1620497998791-64bb5dc460b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2145&q=80',
  },
];

export const imageForm = document.querySelector('#image-form');
export const modalEditForm = document.querySelector('.modal_type_edit-profile');
export const modalEditImage = document.querySelector('.modal_type_edit-image');
export const modalAddCard = document.querySelector('.modal_type_add-element');
export const modalImage = document.querySelector('.modal_type_image');
export const editProfileBtn = document.querySelector('.profile__edit-btn');
export const editProfileImageBtn = document.querySelector(
  '.profile__image-edit'
);
export const closeProfileBtn = modalEditForm.querySelector('.modal__close-btn');
export const closeAddCardModalBtn =
  modalAddCard.querySelector('.modal__close-btn');
export const addCardBtn = document.querySelector('.profile__add-element-btn');
export const inputName = '.form__text-input_type_name';
export const inputJob = '.form__text-input_type_job';
export const inputTitle = modalAddCard.querySelector(
  '.form__text-input_type_title'
);
export const inputUrl = modalAddCard.querySelector(
  '.form__text-input_type_url'
);
export const profileName = '.profile__name';
export const profileJob = '.profile__job';
export const profileImage = '.profile__image';
export const cardTemplate = document.querySelector('#card-template').content;
export const cardsContainer = '.cards__container';
export const togglePopupClass = 'modal_opened';
export const closePopupButton = '.modal__close-btn';
