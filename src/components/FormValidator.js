class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = [
      ...this._formElement.querySelectorAll(this._settings.inputSelector),
    ];
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
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
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    const { inactiveButtonClass } = this._settings;
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    const { inactiveButtonClass } = this._settings;
    if (this._buttonElement) {
      this._buttonElement.classList.add(inactiveButtonClass);
    }

    this._inputList.forEach((inputElement) => {
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
