class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError(inputElement, errorMesssage) {
    const {
      validationErrorTypeSelector,
      inputErrorClass,
      activeValidationErrorClass,
    } = this._settings;
    const errorElement = this._formElement.querySelector(
      `${validationErrorTypeSelector}${inputElement.id}`
    );
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMesssage;
    errorElement.classList.add(activeValidationErrorClass);
  }

  _hideInputError(inputElement) {
    const {
      validationErrorTypeSelector,
      inputErrorClass,
      activeValidationErrorClass,
    } = this._settings;
    const errorElement = this._formElement.querySelector(
      `${validationErrorTypeSelector}${inputElement.id}`
    );
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(activeValidationErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        this._settings
      );
    } else {
      this._hideInputError(inputElement, this._settings);
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

  _setEventListeners() {
    const { inputSelector, submitButtonSelector } = this._settings;
    const inputList = [...this._formElement.querySelectorAll(inputSelector)];
    const buttonElement = this._formElement.querySelector(submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement, this._settings);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, this._settings);
        this._toggleButtonState(inputList, buttonElement, this._settings);
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this._formElement);
  }

  resetValidation() {
    const { submitButtonSelector, inputSelector, inactiveButtonClass } =
      this._settings;
    const buttonElement = this._formElement.querySelector(submitButtonSelector);
    const inputList = [...this._formElement.querySelectorAll(inputSelector)];

    if (buttonElement) {
      buttonElement.classList.add(inactiveButtonClass);
    }

    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}

const settings = {
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__submit-btn',
  validationErrorTypeSelector: '.form__validation-error_type_',
  activeValidationErrorClass: 'form__validation-error_active',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__text-input_error',
};

export { settings, FormValidator };
