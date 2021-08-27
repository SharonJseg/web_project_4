

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputList.forEach( inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement)        
        })
    })
}

 const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector))
    formList.forEach( formElement => {
            formElement.addEventListener('submit', evt => {
            evt.preventDefault();
           // picks the form.target by name attribute and attaches the function to it.
            const target = evt.target.getAttribute('name');
            if (target === 'profile') {
                // run the submitEditProfileForm function
                // console.log('profile updated')
            } else if (target === 'add-card') {
                // run the CreateSingleCard function
                // console.log('card created')
            }
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldSetSelector))
        fieldsetList.forEach(fieldset => {
            setEventListeners(fieldset, settings)
        })
    })
}


enableValidation({
    formSelector: ".form",
    fieldSetSelector: ".form__fieldset",
    inputSelector: ".form__text-input",
    submitButtonSelector: ".form__submit-btn",
    inactiveButtonClass: "form__submit-btn_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
  }); 


// export default enableValidattion

