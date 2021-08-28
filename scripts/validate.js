
const showInputError = (formElement, inputElement, errorMesssage, API) =>{
    const errorElement = formElement.querySelector(`${API.validationErrorTypeSelector}${inputElement.id}`)
    inputElement.classList.add(API.inputErrorClass);
    errorElement.textContent = errorMesssage;
    errorElement.classList.add(API.activeValidationErrorClass);
}

const hideInputError = (formElement, inputElement, API) => {
    const errorElement = formElement.querySelector(`${API.validationErrorTypeSelector}${inputElement.id}`)
    inputElement.classList.remove(API.inputErrorClass)
    errorElement.classList.remove(API.activeValidationErrorClass);
    errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, API) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, API);
    } else {
        hideInputError(formElement, inputElement, API)
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some( inputElement => {
        return !inputElement.validity.valid;
    })
}

const toggleButtonState = (inputList, buttonElement, API) => {
    if(hasInvalidInput(inputList)) {
        buttonElement.classList.add(API.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(API.inactiveButtonClass);
    }
}

const setEventListeners = (formElement, API) => {
    const inputList = Array.from(formElement.querySelectorAll(API.inputSelector));
    const buttonElement = formElement.querySelector(API.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, API)
    inputList.forEach( inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, API)  
            toggleButtonState(inputList, buttonElement, API)      
        })
    })
}

 const enableValidation = (API) => {
    const formList = Array.from(document.querySelectorAll(API.formSelector))
    formList.forEach( formElement => {
            formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(API.fieldSetSelector))
        fieldsetList.forEach(fieldset => {
            setEventListeners(fieldset, API)
        })
    })
}


enableValidation({
    formSelector: ".form",
    fieldSetSelector: ".form__fieldset",
    inputSelector: ".form__text-input",
    submitButtonSelector: ".form__submit-btn",
    validationErrorTypeSelector: '.form__validation-error_type_',
    activeValidationErrorClass: 'form__validation-error_active',
    inactiveButtonClass: "form__submit-btn_disabled",
    inputErrorClass: "form__text-input_error"
  }); 



export const resetValidation = (popup) => {
    const buttonElement = popup.querySelector('.form__submit-btn');
    const validationList = popup.querySelectorAll('.form__validation-error');
    const inputList = popup.querySelectorAll('.form__text-input')
    
    if (buttonElement) {
        buttonElement.classList.add('form__submit-btn_disabled');
    }
    
    validationList.forEach( validationElement => {
        validationElement.textContent = '';
    })
    
    inputList.forEach( inputElement => {
        inputElement.classList.remove('form__text-input_error');
    })
}

export default resetValidation;