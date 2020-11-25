import { serverUrl, headers } from './utils';

export class Api {
    constructor({ serverUrl, headers }) {
      this._serverUrl = serverUrl;
      this._headers = headers;
    }
  
    _getResponseData(res) {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(`Ошибка ${res.status}`);
    }
  
    getUserInfo() {
      return fetch(`${this._serverUrl}users/me`, {
        headers: this._headers
      })
        .then(this._getResponseData);
    }
  
    getInitialCards() {
      return fetch(`${this._serverUrl}cards`, {
        headers: this._headers
      })
        .then(this._getResponseData);
    }
  
    setUserInfo(data) {
      return fetch(`${this._serverUrl}users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })
      })
        .then(this._getResponseData);
    }
  
    addNewCard(data) {
      return fetch(`${this._serverUrl}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
        .then(this._getResponseData);
    }
  
    /*setLike(cardId) {
      return fetch(`${this._serverUrl}cards/likes/${cardId}`, {
        method: 'PUT',
        headers: this._headers
      })
        .then(this._getResponseData);
    }
  
    deleteLike(cardId) {
      return fetch(`${this._serverUrl}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._getResponseData);
    }*/

    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._serverUrl}cards/likes/${cardId}`, {
        method: (isLiked ? "PUT" : "DELETE"),
        headers: this._headers
      })
        .then(this._getResponseData);
    }
  
    deleteCard(cardId) {
      return fetch(`${this._serverUrl}cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(this._getResponseData);
    }
  
    setUserAvatar(link) {
      return fetch(`${this._serverUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: link
        })
      })
        .then(this._getResponseData);
    }
  }

  
  const api = new Api({
      serverUrl: serverUrl,
      headers: headers
  })

  export default api