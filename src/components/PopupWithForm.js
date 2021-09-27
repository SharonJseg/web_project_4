import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, handleSubmitForm }) {
    super(popup);
    this._popup = popup;
    this._handleSubmitForm = handleSubmitForm;
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
    console.log(inputValues);
    evt.currentTarget.reset();
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
