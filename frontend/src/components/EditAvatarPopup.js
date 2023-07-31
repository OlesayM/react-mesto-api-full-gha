import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar, onLoading }) {
  // Реф для аватара
  const avatarRef = useRef();
  // Эффект для очистки формы
  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({ avatar: avatarRef.current.value });
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      buttonText= {onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        type="url"
        className="popup__input popup__input_field_avatar"
        name="avatar"
        required
        placeholder="Введите ссылку на аватар"
        ref={avatarRef}
        minLength="2"
        maxLength="200"
      />
      <span className="popup__error avatar-input-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
