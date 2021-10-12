const imageForm = document.querySelector('#image-form');
const modalEditForm = document.querySelector('.modal_type_edit-profile');
const modalEditImage = document.querySelector('.modal_type_edit-image');
const modalAddCard = document.querySelector('.modal_type_add-element');
const modalConfirmDelete = document.querySelector('.modal_type_delete-card');
const modalImage = document.querySelector('.modal_type_image');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const editProfileImageBtn = document.querySelector('.profile__image-edit');
const closeProfileBtn = modalEditForm.querySelector('.modal__close-btn');
const closeAddCardModalBtn = modalAddCard.querySelector('.modal__close-btn');
const addCardBtn = document.querySelector('.profile__add-element-btn');
const inputName = modalEditForm.querySelector('.form__text-input_type_name');
const inputJob = modalEditForm.querySelector('.form__text-input_type_job');
const inputTitle = modalAddCard.querySelector('.form__text-input_type_title');
const inputUrl = modalAddCard.querySelector('.form__text-input_type_url');
const profileName = '.profile__name';
const profileJob = '.profile__job';
const profileImage = '.profile__image';
const cardTemplate = document.querySelector('#card-template').content;

export {
  imageForm,
  modalEditForm,
  modalEditImage,
  modalAddCard,
  modalConfirmDelete,
  modalImage,
  editProfileBtn,
  editProfileImageBtn,
  closeProfileBtn,
  closeAddCardModalBtn,
  addCardBtn,
  inputName,
  inputJob,
  inputTitle,
  inputUrl,
  profileName,
  profileJob,
  profileImage,
  cardTemplate,
};
