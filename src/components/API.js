export default class API {
  constructor({ address, token, groupId }) {
    this._address = address;
    this._groupId = groupId;
    this._token = token;
  }

  getInitialCards() {
    return fetch(`${this._address}${this._groupId}/cards`, {
      method: 'GET',
      headers: {
        authorization: `${this._token}`,
        'content-type': 'application/json',
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`${res.status}: ${res.statusText}`)
    );
  }

  getUserInfo() {
    return fetch(`${this._address}${this._groupId}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `${this._token}`,
        'content-type': 'application/json',
      },
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error type: ${res.status}`)
      )
      .then((result) => console.log(result));
  }

  updateUserInfo() {
    return fetch(`${this._address}${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Physicist and Chemist',
      }),
    });
  }

  updateUserImage() {
    return fetch(`${this._address}${this._groupId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      }),
    });
  }
}
