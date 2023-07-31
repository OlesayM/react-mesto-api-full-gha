import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `description__like ${
    isLiked && 'description__like_active'
  }`;

  function handleCardClick() {
    onCardClick(card);
  }
  function handleCardDelete() {
    onCardDelete(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  return (
    <article className="element">
      {isOwn && (
        <button
          className="element__deleteButton"
          type="button"
          onClick={handleCardDelete}
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
        className="element__img"
      />
      <div className="description">
        <h2 className="description__name">{card.name}</h2>
        <div className="description__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="description__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
