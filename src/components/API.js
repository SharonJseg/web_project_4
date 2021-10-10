class API {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    this._name = document.querySelector('.profile__name');
    this._job = document.querySelector('.profile__job');
  }

  // getAllInfo() {
  //   return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  // }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}: ${res.statusText}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleResponse);
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
    }).then(this._handleResponse);
  }

  addNewCard(data) {
    const { title, url } = data;
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: url,
      }),
    })
      .then(this._handleResponse)
      .then((res) => console.log(res));
  }

  updateUserImage(test) {
    console.log(test);
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: test,
      }),
    }).then(this._handleResponse);
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
