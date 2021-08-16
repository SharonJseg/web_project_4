let page = document.querySelector('.page');
let pageContainer = page.querySelector('.page__container');
let modal = page.querySelector('.modal');
let formElement = document.querySelector('.form');
let editProfileBtn = pageContainer.querySelector('.profile__edit');
let closeEditorBtn = page.querySelector('.modal__close-btn');

let inputName = formElement.querySelector('.form__text-input_type_name');
let inputTitle = formElement.querySelector('.form__text-input_type_title');
let profileName = pageContainer.querySelector('.profile__name');
let profileTitle = pageContainer.querySelector('.profile__title');


function openEditor() {
    let isOpened = modal.classList.add('modal_opened');
    
    if(isOpened = true) {
    inputName.value = profileName.textContent;
    inputTitle.value = profileTitle.textContent;
} 
}

function closeEditor () {
    modal.classList.remove('modal_opened');
}


function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = `${inputName.value}`;
    profileTitle.textContent = `${inputTitle.value}`;
    modal.classList.remove('modal_opened');
}

editProfileBtn.addEventListener('click', openEditor);
closeEditorBtn.addEventListener('click', closeEditor);
formElement.addEventListener('submit', handleFormSubmit);