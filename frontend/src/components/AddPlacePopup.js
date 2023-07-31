import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onClose, isOpen, onAddPlace, onLoading }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: title,
      link: link,
    });
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      buttonText= {onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="formset">
        <input
          id="mesto-input"
          className="popup__input popup__input_field_mesto"
          name="title"
          type="text"
          value={title || ''}
          onChange={handleChangeTitle}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__error mesto-input-error"></span>
        <input
          id="link-input"
          className="popup__input popup__input_field_link"
          name="link"
          type="url"
          value={link || ''}
          onChange={handleChangeLink}
          placeholder="Ссылка на картинку"
          required
        />
        <p className="popup__error link-input-error"></p>
      </fieldset>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
