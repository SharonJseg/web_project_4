const page = document.querySelector('.page');
const pageContainer = page.querySelector('.page__container');
const modal = page.querySelector('.modal');
const formElement = document.querySelector('.form');
const editProfileBtn = pageContainer.querySelector('.profile__edit-btn');
const closeEditorBtn = page.querySelector('.modal__close-btn');
const inputName = formElement.querySelector('.form__text-input_type_name');
const inputTitle = formElement.querySelector('.form__text-input_type_title');
const profileName = pageContainer.querySelector('.profile__name');
const profileTitle = pageContainer.querySelector('.profile__title');
const cardsContainer = document.querySelector('.cards__container')


function handleEditor () {
    if (modal.classList.contains('modal_opened')){
        modal.classList.remove('modal_opened');
    } else {
        modal.classList.add('modal_opened');
        inputName.value = profileName.textContent;
        inputTitle.value = profileTitle.textContent;
    }
}

editProfileBtn.addEventListener('click', handleEditor);
closeEditorBtn.addEventListener('click', handleEditor);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = `${inputName.value}`;
    profileTitle.textContent = `${inputTitle.value}`;
    modal.classList.remove('modal_opened');
}

formElement.addEventListener('submit', handleFormSubmit);

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



function populateCards () {
    const cardTemplate = document.querySelector('#card-template').content;
    
    initialCards.forEach(card => {
        const cardElement = cardTemplate.querySelector('.card__container').cloneNode(true);
        cardElement.querySelector('.card__name').textContent = card.name;
        cardElement.querySelector('.card__image').setAttribute('src', card.link);
        cardElement.querySelector('.card__image').setAttribute('alt', card.name);
        cardElement.querySelector('.card__like-button').addEventListener('click', (evt) => {
            evt.target.classList.toggle('card__like-button_active');
        })
        cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {
            evt.target.closest('.card__container').remove();
        })
        cardsContainer.append(cardElement)
    })    
}

populateCards();