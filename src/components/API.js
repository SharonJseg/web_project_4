export default class API {
  constructor({ address, token, groupId }) {
    this._address = address;
    this._groupId = groupId;
    this._token = token;
    this._name = document.querySelector('.profile__name');
    this._job = document.querySelector('.profile__job');
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

  addNewCard(data) {
    console.log(data);
    const { title, url } = data;
    return fetch(`${this._address}${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: title,
        link: url,
      }),
    }).then((res) =>
      res.ok ? res : Promise.reject(`${res.status}: ${res.statusText}`)
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
        res.ok ? res.json() : Promise.reject(`${res.status}: ${res.statusText}`)
      )
      .then((userInfo) => {
        const { name, about } = userInfo;
        this._name.textContent = name;
        this._job.textContent = about;
        return userInfo;
      });
  }

  updateUserInfo(userInfo) {
    const { name, job } = userInfo;
    return fetch(`${this._address}${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    }).then((res) => {
      res.ok
        ? this.getUserInfo()
        : Promise.reject(`${res.status}: ${res.statusText}`);
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
