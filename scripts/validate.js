class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }

    _showInputError(formElement, inputElement, errorMesssage, settings) {
        const { validationErrorTypeSelector, inputErrorClass, activeValidationErrorClass } = settings;
        const errorElement = formElement.querySelector(`${validationErrorTypeSelector}${inputElement.id}`)
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMesssage;
        errorElement.classList.add(activeValidationErrorClass);
    }

    _hideInputError(formElement, inputElement, settings) {
        const { validationErrorTypeSelector, inputErrorClass, activeValidationErrorClass } = settings;
        const errorElement = formElement.querySelector(`${validationErrorTypeSelector}${inputElement.id}`)
        inputElement.classList.remove(inputErrorClass)
        errorElement.classList.remove(activeValidationErrorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(formElement, inputElement, settings) {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, settings);
        } else {
            this._hideInputError(formElement, inputElement, settings)
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some(inputElement => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState(inputList, buttonElement, settings) {
        const { inactiveButtonClass } = settings;
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass);
        } else {
            buttonElement.classList.remove(inactiveButtonClass);
        }
    }


    _setEventListeners(fieldset, settings) {
        const { inputSelector, submitButtonSelector } = settings;
        const inputList = [...fieldset.querySelectorAll(inputSelector)];
        const buttonElement = fieldset.querySelector(submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement, settings)
        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(fieldset, inputElement, settings)
                this._toggleButtonState(inputList, buttonElement, settings)
            })
        })
    }

    _resetValidation(popup, settings) {
        const { submitButtonSelector, inputSelector, formSelector, inactiveButtonClass } = settings;
        const buttonElement = popup.querySelector(submitButtonSelector);
        const inputList = [...popup.querySelectorAll(inputSelector)];
        const formElement = popup.querySelector(formSelector);

        if (buttonElement) {
            buttonElement.classList.add(inactiveButtonClass);
        }

        inputList.forEach(inputElement => {
            this._hideInputError(formElement, inputElement, settings)
        })
    }

    enableValidation(settings) {
        const { fieldSetSelector } = settings;
        const formElement = this._formElement;
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        })

        const fieldsetList = [...formElement.querySelectorAll(fieldSetSelector)];
        fieldsetList.forEach(fieldset => {
            this._setEventListeners(fieldset, settings)
        })
    }
}

const settings = {
    formSelector: ".form",
    fieldSetSelector: ".form__fieldset",
    inputSelector: ".form__text-input",
    submitButtonSelector: ".form__submit-btn",
    validationErrorTypeSelector: '.form__validation-error_type_',
    activeValidationErrorClass: 'form__validation-error_active',
    inactiveButtonClass: "form__submit-btn_disabled",
    inputErrorClass: "form__text-input_error"
}

export { settings, FormValidator };