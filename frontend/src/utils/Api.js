import apiFindings from './utils';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // ответ сервера
  _responseStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }

  // загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._responseStatus);
  }

  // информация о пользователе с сервера
  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._responseStatus);
  }

  // редактирование профиля
  setProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._responseStatus);
  }

  // добавление новой карточки на сервер
  setNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._responseStatus);
  }

  // обновление аватара пользователя
  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._responseStatus);
  }

  // // постановка лайка
  // putLike(data) {
  //   return fetch(`${this._baseUrl}/cards/${data}/likes/`, {
  //     method: 'PUT',
  //     headers: this._headers,
  //   }).then(this._responseStatus);
  // }

  // // снятие лайка
  // deleteLike(data) {
  //   return fetch(`${this._baseUrl}/cards/${data}/likes/`, {
  //     method: 'DELETE',
  //     headers: this._headers,
  //   }).then(this._responseStatus);
  // }

  // работа кнопки лайк
  changeLikeCardStatus (data, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${data}/likes/`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._responseStatus);
    } else {
      return fetch(`${this._baseUrl}/cards/${data}/likes/`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._responseStatus);
    }
  }


  // удаление карточки
  removeCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._responseStatus);
  }
  getServerData() {
    return Promise.all([this.getInitialCards(), this.getProfileInfo()]);
  }
}
// Создание экземпляра класса
const apiConnect = new Api(apiFindings);

// Экспорт экземпляра класса
export default apiConnect;