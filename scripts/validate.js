
const showInputError = (formElement, inputElement, errorMesssage, settings) =>{
    const errorElement = formElement.querySelector(`${settings.validationErrorTypeSelector}${inputElement.id}`)
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMesssage;
    errorElement.classList.add(settings.activeValidationErrorClass);
}

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`${settings.validationErrorTypeSelector}${inputElement.id}`)
    inputElement.classList.remove(settings.inputErrorClass)
    errorElement.classList.remove(settings.activeValidationErrorClass);
    errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings)
    }
}

const hasInvalidInput = inputList => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

const toggleButtonState = (inputList, buttonElement, settings) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
}

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings)
    inputList.forEach( inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, settings)  
            toggleButtonState(inputList, buttonElement, settings)      
        })
    })
}

 const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector))
    formList.forEach( formElement => {
            formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldSetSelector))
        fieldsetList.forEach(fieldset => {
            setEventListeners(fieldset, settings)
        })
    })
}

export const settings = {
    formSelector: ".form",
    fieldSetSelector: ".form__fieldset",
    inputSelector: ".form__text-input",
    submitButtonSelector: ".form__submit-btn",
    validationErrorTypeSelector: '.form__validation-error_type_',
    activeValidationErrorClass: 'form__validation-error_active',
    inactiveButtonClass: "form__submit-btn_disabled",
    inputErrorClass: "form__text-input_error"
}

enableValidation(settings); 

export const resetValidation = (popup, settings) => {
    const buttonElement = popup.querySelector(settings.submitButtonSelector);
    const inputList = Array.from(popup.querySelectorAll(settings.inputSelector))
    const formElement = popup.querySelector(settings.formSelector)
    
    if (buttonElement) {
        buttonElement.classList.add(settings.inactiveButtonClass);
    }

    inputList.forEach(inputElement => {
        hideInputError(formElement, inputElement, settings)
    })
}

