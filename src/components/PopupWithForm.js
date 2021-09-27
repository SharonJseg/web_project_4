import Popup from './Popup.js';
import { inputName, inputJob } from '../utils/constants.js';
import { FormValidator, settings } from './FormValidator.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, handleSubmitForm }) {
    super(popup);
    this._popup = popup;
    this._handleSubmitForm = handleSubmitForm;
    this._FormValidator = new FormValidator(settings, this._popup);
  }

  open(values) {
    super.open();
    this._FormValidator.enableValidation(settings);

    if (values.name && values.job) {
      const { name, job } = values;
      document.querySelector(inputName).value = name;
      document.querySelector(inputJob).value = job;
    }
  }

  close() {
    super.close();
    this._FormValidator.resetValidation(this._popup);
    this._popup.querySelector('form').reset();
  }

  removeEventListeners() {
    this._popup
      .querySelector('form')
      .removeEventListener('submit', this.handleSubmitForm);
  }

  setEventListeners() {
    super.setEventListeners();
    const form = this._popup.querySelector('form');
    form.addEventListener('submit', this.handleSubmitForm);
  }

  handleSubmitForm = (evt) => {
    evt.preventDefault();
    const inputValues = this._handleSubmitForm(this._getInputValues());
    this.close();
    return inputValues;
  };

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.form__text-input');
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }
}
