import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  cards,
  onCardDelete,
  onCardLike,
}) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button
            className="profile__avatar-button"
            type="button"
            onClick={onEditAvatar}
          >
            <div
              className="profile__avatar"
              style={{
                backgroundImage: `url(${currentUser.avatar})`,
                objectFit: 'contain',
              }}
            ></div>
          </button>
          <div className="profile__info">
            <div className="user-field">
              <h1 className="profile__username">{currentUser.name}</h1>
              <button
                className="profile__editbutton"
                type="button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__occupation">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__addbutton"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            name={card.name}
            link={card.link}
            likes={card.likes}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
