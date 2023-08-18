class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._password = headers['authorization'];
  }

  _serverResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Произошла ошибка ${res.status}.`);
    }
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._password
      }
    }).then(res => this._serverResponse(res));
  }

  getInfoUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._password
      }
    }).then(res => this._serverResponse(res));
  }

  editInfoUser({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._password,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(res => this._serverResponse(res));
  }
  editAvatarUser(info) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._password,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    }).then(res => this._serverResponse(res));
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._password,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => this._serverResponse(res));
  }

  addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._password
      }
    }).then(res => this._serverResponse(res));
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._password
      }
    }).then(res => this._serverResponse(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._password
      }
    }).then(res => this._serverResponse(res));
  }
}

export default new Api({
  baseUrl: 'https://api.maratft007.nomoreparties.co',
  // baseUrl: 'http://localhost:3001',
  headers: {
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
});
