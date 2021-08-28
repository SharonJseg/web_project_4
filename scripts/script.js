import {resetValidation, settings} from "./validate.js"
import initialCards from "./initialCards.js";

const modalEditForm = document.querySelector('.modal_type_edit-profile');
const modalAddCard = document.querySelector('.modal_type_add-element');
const modalImage = document.querySelector('.modal_type_image');

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

const popUpHandler = evt => {
    const modalList = Array.from(document.querySelectorAll('.modal'));
    modalList.forEach(modalElement => {
        if(evt.key === 'Escape' && modalElement.classList.contains('modal_opened')) {
            closePopUp(modalElement); 
        }
    })
  
    if(evt.target === evt.currentTarget) {
      closePopUp(evt.currentTarget);
    }
}

const openPopUp = popup => {
    popup.classList.add('modal_opened');
    document.addEventListener('keydown', popUpHandler)
    popup.addEventListener('click', popUpHandler)
}

const openEditProfile = () => {
    openPopUp(modalEditForm)
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

const openAddCardPopup = () => {
    openPopUp(modalAddCard)
    inputTitle.value = '';
    inputUrl.value = '';
}

const closePopUp = (popup) => {
    document.removeEventListener('keydown', popUpHandler)
    popup.removeEventListener('click', popUpHandler)
    popup.classList.remove('modal_opened');
    resetValidation(popup, settings) 
}

const closeEditProfilePopup = () => {
    closePopUp(modalEditForm);
}

const closeAddCardPopup = () => {
    closePopUp(modalAddCard);
}

const openModalImagePopup = () => {
    closePopUp(modalImage);
}

editProfileBtn.addEventListener('click', openEditProfile);
addCardBtn.addEventListener('click', openAddCardPopup);
closeProfileBtn.addEventListener('click', closeEditProfilePopup);
closeAddCardModalBtn.addEventListener('click', closeAddCardPopup);


const submitEditProfileForm = () => {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closeEditProfilePopup();
}
modalEditForm.addEventListener('submit', submitEditProfileForm);

const deleteCard = evt => {
    let deletedCard = evt.target.closest('.card__container');
    deletedCard.remove();
    deletedCard = null;
}

const likeCard = evt => {
    evt.target.classList.toggle('card__like-button_active');
}

const openImageGallery = evt => {
    openPopUp(modalImage);
    const modalLargeImage =  modalImage.querySelector('.modal__image');
    const targetSrc = evt.target.parentElement.querySelector('.card__image').getAttribute('src');
    const targetName = evt.target.parentElement.querySelector('.card__name').textContent;
    modalLargeImage.setAttribute('src', targetSrc);
    modalLargeImage.setAttribute('alt', targetName);
    modalImage.querySelector('.modal__title').textContent = targetName;
}

modalImage.querySelector('.modal__close-btn').addEventListener('click', openModalImagePopup)

const createCard = (card) => {
    const cardElement = cardTemplate.querySelector('.card__container').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__name');
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard)
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard)
    cardElement.querySelector('.card__image').addEventListener('click', openImageGallery)

    cardTitle.textContent = card.name;
    cardImage.setAttribute('src', card.link);
    cardImage.setAttribute('alt', card.name);
    return cardElement;
}

initialCards.forEach(card => {
    cardsContainer.append(createCard(card));
})

const submitCard = () => {
    const link = inputUrl.value;
    const name = inputTitle.value;
    cardsContainer.prepend(createCard({name, link}));
    closePopUp(modalAddCard);
} 

modalAddCard.addEventListener('submit', submitCard);


