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


const openPopUp = popup => {
    if (popup.target == editProfileBtn){
        openEditProfile();
    } else if (popup.target == addCardBtn) {
        openAddCardPopup();
    }
}

const openEditProfile = () => {
    modalEditForm.classList.add('modal_opened')
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
}

const openAddCardPopup = () => {
    modalAddCard.classList.add('modal_opened')
    inputTitle.value = '';
    inputUrl.value = '';
}

const closePopUp = popup => {
    if (popup.target == closeProfileBtn){
        closeEditProfilePopup();
    } else if (popup.target == closeAddCardModalBtn) {
        closeAddCardPopup();
    } else {
        modalImage.classList.remove('modal_opened');
    }
}

const closeEditProfilePopup = () => {
    modalEditForm.classList.remove('modal_opened');
}

const closeAddCardPopup = () => {
    modalAddCard.classList.remove('modal_opened');
}

editProfileBtn.addEventListener('click', openPopUp);
addCardBtn.addEventListener('click', openPopUp);
closeProfileBtn.addEventListener('click', closePopUp);
closeAddCardModalBtn.addEventListener('click', closePopUp);


const submitForm = evt => {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileJob.textContent = inputJob.value;
    closeEditProfilePopup();
}
modalEditForm.addEventListener('submit', submitForm);

const deleteCard = evt => {
    evt.target.closest('.card__container').remove();
}

const likeCard = evt => {
    evt.target.classList.toggle('card__like-button_active');
}

const openImageGallery = evt => {
    modalImage.classList.add('modal_opened');
    const targetSrc = evt.target.parentElement.querySelector('.card__image').getAttribute('src');
    const targetName = evt.target.parentElement.querySelector('.card__name').textContent;
    modalImage.querySelector('.modal__image').setAttribute('src', targetSrc);
    modalImage.querySelector('.modal__image').setAttribute('alt', targetName);
    modalImage.querySelector('.modal__title').textContent = targetName;
    modalImage.querySelector('.modal__close-btn').addEventListener('click', closePopUp)
}

const createCard = (title, url) => {
    const cardElement = cardTemplate.querySelector('.card__container').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__name');
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard)
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard)
    cardElement.querySelector('.card__image').addEventListener('click', openImageGallery)

    cardTitle.textContent = title;
    cardImage.setAttribute('src', url);
    cardImage.setAttribute('alt', title);
    return cardElement;
}

initialCards.forEach(card => {
    cardsContainer.append(createCard(card.name, card.link));
})

modalAddCard.addEventListener('submit', evt => {
    evt.preventDefault();
    const title = inputTitle.value;
    const url = inputUrl.value;
    cardsContainer.prepend(createCard(title, url));
    modalAddCard.classList.remove('modal_opened');
})   


