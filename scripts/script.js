const modal = document.querySelector('.modal');
const formElement = document.querySelector('.form');
const editProfileBtn = document.querySelector('.profile__edit-btn');
const closeEditorBtn = document.querySelector('.modal__close-btn');
const inputName = formElement.querySelector('.form__text-input_type_name');
const inputTitle = formElement.querySelector('.form__text-input_type_title');
const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const cardsContainer = document.querySelector('.cards__container');
const popUpContainer = document.querySelector('.popup__container');


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
            // Add like to the image object if like button was clicked for future sorting by the likes
            evt.target.classList.contains('card__like-button_active') ? card.like = true : card.like = false;
        })
        cardElement.querySelector('.card__delete-button').addEventListener('click', (evt) => {
            evt.target.closest('.card__container').remove();
        })
        cardElement.querySelector('.card__image').addEventListener('click', (evt) => {
            
            const imageModalTemplate = document.querySelector('#image-modal').content;
            const modalElement = imageModalTemplate.querySelector('.modal').cloneNode(true);
            modalElement.classList.toggle('modal_opened');
            popUpContainer.append(modalElement);

            const targetSrc = evt.target.parentElement.querySelector('.card__image').getAttribute('src');
            const targetName = evt.target.parentElement.querySelector('.card__name').textContent;
           
            modalElement.querySelector('.card__image').setAttribute('src', targetSrc);
            modalElement.querySelector('.card__name').textContent = targetName;
            
            modalElement.querySelector('.modal__close-btn').addEventListener('click', () => {
                modalElement.classList.toggle('modal_opened');
                modalElement.remove();
            }) 
        })
        cardsContainer.append(cardElement)
    })   
}

populateCards();

