const modalEditForm = document.querySelector('.modal_type_edit-profile');
const modalAddCard = document.querySelector('.modal_type_add-element');

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
const popUpContainer = document.querySelector('.popup__container');

const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card__container').cloneNode(true);
const title = cardElement.querySelector('.card__name');




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

const initialCards = [
    {
        name: 'Yosemite Valley',
        link: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2103&q=80'},
    {
        name: 'Lake Louise',
        link: 'https://images.unsplash.com/photo-1581088382991-83c7f170de75?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80'},
    {
        name: 'Bald Mountains',
        link: 'https://images.unsplash.com/photo-1601025252036-36faf914679d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2001&q=80'},
    {
        name: 'Latemar',
        link: 'https://images.unsplash.com/photo-1539540706191-b673a0a5b6d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80'},
    {
        name: 'Vanoise National Park',
        link: 'https://images.unsplash.com/photo-1549752448-38f4d94420f5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'},
    {
        name: 'Lago di Braies',
        link: 'https://images.unsplash.com/photo-1620497998791-64bb5dc460b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2145&q=80'}
]


initialCards.forEach(card => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card__container').cloneNode(true);
    cardElement.querySelector('.card__name').textContent = card.name;
    cardElement.querySelector('.card__image').setAttribute('src', card.link);
    cardElement.querySelector('.card__image').setAttribute('alt', card.name);
    cardsContainer.appendChild(cardElement);

    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {
        console.log(evt.target)
        evt.target.closest('.card__container').remove();
      })
    
    cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like-button_active');
      })

    cardElement.querySelector('.card__image').addEventListener('click', (evt) => {
    const imageModalTemplate = document.querySelector('#image-template').content;
    const modalElement = imageModalTemplate.querySelector('.modal').cloneNode(true);
    modalElement.classList.toggle('modal_opened');
    popUpContainer.append(modalElement);

    const targetSrc = evt.target.parentElement.querySelector('.card__image').getAttribute('src');
    const targetName = evt.target.parentElement.querySelector('.card__name').textContent;
    
    modalElement.querySelector('.card__image').setAttribute('src', targetSrc);
    modalElement.querySelector('.card__image').setAttribute('alt', targetName);
    modalElement.querySelector('.card__name').textContent = targetName;
    
    modalElement.querySelector('.modal__close-btn').addEventListener('click', () => {
    modalElement.classList.toggle('modal_opened');
    modalElement.remove();
        }) 
    })
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


function createCard (titleValue, urlValue){
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card__container').cloneNode(true);
    cardElement.querySelector('.card__name').textContent = titleValue;
    cardElement.querySelector('.card__image').setAttribute('src', urlValue);
    cardElement.querySelector('.card__image').setAttribute('alt', titleValue);
    cardsContainer.prepend(cardElement);
    
    cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {
        console.log(evt.target)
        evt.target.closest('.card__container').remove();
      })

    cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like-button_active');
      })

    cardElement.querySelector('.card__image').addEventListener('click', (evt) => {
    const imageModalTemplate = document.querySelector('#image-template').content;
    const modalElement = imageModalTemplate.querySelector('.modal').cloneNode(true);
    modalElement.classList.toggle('modal_opened');
    popUpContainer.append(modalElement);

    const targetSrc = evt.target.parentElement.querySelector('.card__image').getAttribute('src');
    const targetName = evt.target.parentElement.querySelector('.card__name').textContent;
    
    modalElement.querySelector('.card__image').setAttribute('src', targetSrc);
    modalElement.querySelector('.card__image').setAttribute('alt', targetName);
    modalElement.querySelector('.card__name').textContent = targetName;
    
    modalElement.querySelector('.modal__close-btn').addEventListener('click', () => {
    modalElement.classList.toggle('modal_opened');
    modalElement.remove();
        }) 
    })
}

modalAddCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createCard(inputTitle.value, inputUrl.value);
    modalAddCard.classList.remove('modal_opened');
})   
