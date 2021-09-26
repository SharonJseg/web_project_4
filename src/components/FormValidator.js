class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError(fieldset, inputElement, errorMesssage) {
    const {
      validationErrorTypeSelector,
      inputErrorClass,
      activeValidationErrorClass,
    } = this._settings;
    const errorElement = fieldset.querySelector(
      `${validationErrorTypeSelector}${inputElement.id}`
    );
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMesssage;
    errorElement.classList.add(activeValidationErrorClass);
  }

  _hideInputError(fieldset, inputElement) {
    const {
      validationErrorTypeSelector,
      inputErrorClass,
      activeValidationErrorClass,
    } = this._settings;
    const errorElement = fieldset.querySelector(
      `${validationErrorTypeSelector}${inputElement.id}`
    );
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(activeValidationErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(fieldset, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        fieldset,
        inputElement,
        inputElement.validationMessage,
        this._settings
      );
    } else {
      this._hideInputError(fieldset, inputElement, this._settings);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    const { inactiveButtonClass } = this._settings;
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }

  _setEventListeners(fieldset) {
    const { inputSelector, submitButtonSelector } = this._settings;
    const inputList = [...fieldset.querySelectorAll(inputSelector)];
    const buttonElement = fieldset.querySelector(submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, this._settings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(fieldset, inputElement, this._settings);
        this._toggleButtonState(inputList, buttonElement, this._settings);
      });
    });
  }

  enableValidation() {
    const { fieldSetSelector } = this._settings;
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const fieldsetList = [
      ...this._formElement.querySelectorAll(fieldSetSelector),
    ];
    fieldsetList.forEach((fieldset) => {
      this._setEventListeners(fieldset, this._settings);
    });
  }

  resetValidation(popup) {
    const {
      submitButtonSelector,
      inputSelector,
      formSelector,
      inactiveButtonClass,
    } = this._settings;
    const buttonElement = popup.querySelector(submitButtonSelector);
    const inputList = [...popup.querySelectorAll(inputSelector)];
    const form = popup.querySelector(formSelector);

    if (buttonElement) {
      buttonElement.classList.add(inactiveButtonClass);
    }

    inputList.forEach((inputElement) => {
      this._hideInputError(form, inputElement, this._settings);
    });
  }
}

const settings = {
  formSelector: '.form',
  fieldSetSelector: '.form__fieldset',
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__submit-btn',
  validationErrorTypeSelector: '.form__validation-error_type_',
  activeValidationErrorClass: 'form__validation-error_active',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__text-input_error',
};

export { settings, FormValidator };
