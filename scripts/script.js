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

const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card__container').cloneNode(true);


function handleEditor () {
    if (modalEditForm.classList.contains('modal_opened')){
        modalEditForm.classList.remove('modal_opened');
    } else {
        modalEditForm.classList.add('modal_opened');
        inputName.value = profileName.textContent;
        inputJob.value = profileJob.textContent;
    }
    closeProfileBtn.addEventListener('click', handleEditor);
}

editProfileBtn.addEventListener('click', handleEditor);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = `${inputName.value}`;
    profileJob.textContent = `${inputJob.value}`;
    modalEditForm.classList.remove('modal_opened');
}

modalEditForm.addEventListener('submit', handleFormSubmit);



const deleteCard = (evt) => {
    evt.target.closest('.card__container').remove();
}

const likeCard = (evt) => {
    evt.target.classList.toggle('card__like-button_active');
}

const openImageGallery = (evt) => {
    modalImage.classList.toggle('modal_opened');
    const imageModalTemplate = document.querySelector('#image-template').content;
    const modalContainer = imageModalTemplate.querySelector('.modal__container').cloneNode(true);
    modalImage.append(modalContainer);
    const targetSrc = evt.target.parentElement.querySelector('.card__image').getAttribute('src');
    const targetName = evt.target.parentElement.querySelector('.card__name').textContent;
    modalContainer.querySelector('.card__image').setAttribute('src', targetSrc);
    modalContainer.querySelector('.card__image').setAttribute('alt', targetName);
    modalContainer.querySelector('.card__name').textContent = targetName;

    modalContainer.querySelector('.modal__close-btn').addEventListener('click', () => {
    modalImage.classList.toggle('modal_opened');
    modalContainer.remove();
    })
}

initialCards.forEach(card => {
    const cardElement = cardTemplate.querySelector('.card__container').cloneNode(true);
    cardElement.querySelector('.card__name').textContent = card.name;
    cardElement.querySelector('.card__image').setAttribute('src', card.link);
    cardElement.querySelector('.card__image').setAttribute('alt', card.name);
    cardsContainer.append(cardElement);
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard)
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard)
    cardElement.querySelector('.card__image').addEventListener('click', openImageGallery)
})

function openCardForm () {
    if(modalAddCard.classList.contains('modal_opened')){
        modalAddCard.classList.remove('modal_opened');
    } else {
        modalAddCard.classList.add('modal_opened');
        inputTitle.value = '';
        inputUrl.value = '';
    }
    closeAddCardModalBtn.addEventListener('click', openCardForm);
}

addCardBtn.addEventListener('click', openCardForm);

function createCard (title, url){
    cardElement.querySelector('.card__name').textContent = title;
    cardElement.querySelector('.card__image').setAttribute('src', url);
    cardElement.querySelector('.card__image').setAttribute('alt', title);
    cardsContainer.prepend(cardElement);
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard)
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard)
    cardElement.querySelector('.card__image').addEventListener('click', openImageGallery)
}

modalAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createCard(inputTitle.value, inputUrl.value);
    modalAddCard.classList.remove('modal_opened');
})   


