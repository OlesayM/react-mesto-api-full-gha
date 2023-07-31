import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ onClose, isOpen, onUpdateUser, onLoading }) {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      buttonText= {onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="formset">
        <input
          id="username-input"
          className="popup__input popup__input_field_username"
          name="name"
          type="text"
          value={name || ''}
          onChange={handleChangeName}
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error username-input-error"></span>
        <input
          id="occupation-input"
          className="popup__input popup__input_field_occupation"
          name="about"
          type="text"
          value={about || ''}
          onChange={handleChangeAbout}
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error occupation-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
