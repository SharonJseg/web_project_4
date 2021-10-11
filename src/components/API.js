class API {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getAllInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}: ${res.statusText}`);
  }

  _catchError(err) {
    console.log(err);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._catchError);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._catchError);
  }

  updateUserInfo(userInfo) {
    const { name, job } = userInfo;
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: job,
      }),
    })
      .then(this._handleResponse)
      .catch(this._catchError);
  }

  updateUserImage(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
      .then(this._handleResponse)
      .catch(this._catchError);
  }

  addNewCard(data) {
    const { title, url } = data;
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: url,
      }),
    })
      .then(this._handleResponse)
      .catch(this._catchError);
  }

  deleteCard(card_id) {
    return fetch(`${this._url}/cards/${card_id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._catchError);
  }

  likeCard(card_id) {
    return fetch(`${this._url}/cards/likes/${card_id}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._catchError);
  }

  dislikeCard(card_id) {
    return fetch(`${this._url}/cards/likes/${card_id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._catchError);
  }
}

const api = new API({
  url: 'https://around.nomoreparties.co/v1/group-12',
  headers: {
    authorization: '9dab4619-413b-4914-b4f4-ee6c3c0ed983',
    'content-type': 'application/json',
  },
});

export default api;
