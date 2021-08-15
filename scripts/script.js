let page = document.querySelector('.page');
let pageContainer = page.querySelector('.page__container');
let modal = page.querySelector('.modal');
let formElement = document.querySelector('.form');
let editProfileBtn = pageContainer.querySelector('.profile__edit');
let closeEditorBtn = page.querySelector('.modal__close-btn');


function toggleEditor () {
    modal.classList.toggle('modal_opened');
}

let inputName = formElement.querySelector('.form__text-input_type_name');
let inputTitle = formElement.querySelector('.form__text-input_type_title');
let profileName = pageContainer.querySelector('.profile__name');
let profileTitle = pageContainer.querySelector('.profile__title');
inputName.value = profileName.textContent;
inputTitle.value = profileTitle.textContent;

function handleFormSubmit(evt) {
    evt.preventDefault();
    
    profileName.textContent = `${inputName.value}`;
    profileTitle.textContent = `${inputTitle.value}`;

    modal.classList.toggle('modal_opened');
}

editProfileBtn.addEventListener('click', toggleEditor);
closeEditorBtn.addEventListener('click', toggleEditor);
formElement.addEventListener('submit', handleFormSubmit);