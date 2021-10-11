import Popup from './Popup';

export default class PopupConfirm extends Popup {
  constructor(popup, handleConfirm) {
    super(popup);
    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
  }

  close = () => {
    super.close();
  };
}
