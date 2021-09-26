export const initialCards = [
  {
    name: 'Yosemite Valley',
    link: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2103&q=80',
  },
  {
    name: 'Lake Louise',
    link: 'https://images.unsplash.com/photo-1581088382991-83c7f170de75?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
  },
  {
    name: 'Bald Mountains',
    link: 'https://images.unsplash.com/photo-1601025252036-36faf914679d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2001&q=80',
  },
  {
    name: 'Latemar',
    link: 'https://images.unsplash.com/photo-1539540706191-b673a0a5b6d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80',
  },
  {
    name: 'Vanoise National Park',
    link: 'https://images.unsplash.com/photo-1549752448-38f4d94420f5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    name: 'Lago di Braies',
    link: 'https://images.unsplash.com/photo-1620497998791-64bb5dc460b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2145&q=80',
  },
];

export const imageForm = document.querySelector('#image-form');
export const modalEditForm = document.querySelector('.modal_type_edit-profile');
export const modalAddCard = document.querySelector('.modal_type_add-element');
export const modalImage = document.querySelector('.modal_type_image');

export const editProfileBtn = document.querySelector('.profile__edit-btn');
export const closeProfileBtn = modalEditForm.querySelector('.modal__close-btn');
export const closeAddCardModalBtn =
  modalAddCard.querySelector('.modal__close-btn');
export const addCardBtn = document.querySelector('.profile__add-element-btn');

export const inputName = modalEditForm.querySelector(
  '.form__text-input_type_name'
);
export const inputJob = modalEditForm.querySelector(
  '.form__text-input_type_job'
);
export const inputTitle = modalAddCard.querySelector(
  '.form__text-input_type_title'
);
export const inputUrl = modalAddCard.querySelector(
  '.form__text-input_type_url'
);

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const cardTemplate = document.querySelector('#card-template').content;
export const cardsContainer = '.cards__container';
