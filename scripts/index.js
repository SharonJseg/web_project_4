import { settings, FormValidator } from "./FormValidator.js"
import { Card } from "./Card.js";
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
const cardsContainer = document.querySelector('.cards__container');


const profileForm = new FormValidator(settings, modalEditForm);
const cardForm = new FormValidator(settings, modalAddCard);

profileForm.enableValidation(settings)
cardForm.enableValidation(settings)


const closePopUpWithClickOnOverlay = evt => {
    if (evt.target === evt.currentTarget) {
        closePopUp(evt.currentTarget);
    }
}

const closePopUpWithKey = evt => {
    if (evt.key === 'Escape') {
        const activeModal = document.querySelector('.modal_opened');
        closePopUp(activeModal);
    }
}

const openPopUp = popup => {
    popup.classList.add('modal_opened');
    document.addEventListener('keydown', closePopUpWithKey)
    popup.addEventListener('click', closePopUpWithClickOnOverlay)
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

const closePopUp = popup => {
    document.removeEventListener('keydown', closePopUpWithKey)
    popup.removeEventListener('click', closePopUpWithClickOnOverlay)
    popup.classList.remove('modal_opened');
    cardForm._resetValidation(popup, settings)
}

const closeEditProfilePopup = () => {
    closePopUp(modalEditForm);
}

const closeAddCardPopup = () => {
    closePopUp(modalAddCard);
}

const closeModalImagePopup = () => {
    closePopUp(modalImage);
}

const submitEditProfileForm = () => {
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closeEditProfilePopup();
}

editProfileBtn.addEventListener('click', openEditProfile);
addCardBtn.addEventListener('click', openAddCardPopup);
closeProfileBtn.addEventListener('click', closeEditProfilePopup);
closeAddCardModalBtn.addEventListener('click', closeAddCardPopup);
modalEditForm.addEventListener('submit', submitEditProfileForm);
modalImage.querySelector('.modal__close-btn').addEventListener('click', closeModalImagePopup)

initialCards.forEach(card => {
    const cardInstance = new Card(card, '#card-template');
    const cardElement = cardInstance.createCard();
    cardsContainer.append(cardElement);
})

const submitCard = () => {
    const link = inputUrl.value;
    const name = inputTitle.value;
    const cardInstance = new Card({ link, name }, '#card-template');
    cardsContainer.prepend(cardInstance.createCard({ name, link }));
    closePopUp(modalAddCard);
}

modalAddCard.addEventListener('submit', submitCard);


