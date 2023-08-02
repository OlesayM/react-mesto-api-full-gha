import React, { useEffect } from 'react';
import { useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import apiConnect from '../utils/Api';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
// import apiFindings from '../utils/utils';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccessSignUp, setSuccessSignUp] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Рендер карточек и данных пользователя
  useEffect(() => {
    const jwt = localStorage.getItem('token');
    if (loggedIn) {
      apiConnect
        .getProfileInfo(jwt)
        .then((data) => {
          setCurrentUser(data);
          setUserEmail(data.email);
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
        apiConnect
        .getInitialCards(jwt)
        .then((data) => {
          setCards(data.reverse());
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    const jwt = localStorage.getItem('token');
    apiConnect
      .removeCard(card, jwt)
      .then(() => {
        setCards((cardsArray) =>
          cardsArray.filter((cardItem) => cardItem._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(`Возникла ошибка при удалении карточки, ${err}`);
      });
  }

  function handleCardLike(card) {
    const jwt = localStorage.getItem('token');
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    console.log(isLiked);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    apiConnect
      .changeLikeCardStatus(card._id, isLiked, jwt)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(`Возникла ошибка при обработке лайков, ${err}`);
      });
  }
  // Обработчик данных пользователя
  function handleUpdateUser(data) {
    const jwt = localStorage.getItem('token');
    setIsLoading(true);
    apiConnect
      .setProfileInfo(data, jwt)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка при редактировании профиля, ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Обработчик изменения аватара
  function handleUpdateAvatar(link) {
    const jwt = localStorage.getItem('token');
    setIsLoading(true);
    apiConnect
      .setUserAvatar(link, jwt)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка при изменении аватара, ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Обработчик добавления места
  function handleAddPlace(data) {
    const jwt = localStorage.getItem('token');
    setIsLoading(true);
    apiConnect
      .setNewCard(data, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Возникла ошибка при добавлении карточки, ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  function handleRegistration(data) {
    auth
      .registration(data)
      .then((data) => {
        console.log(data);
        setSuccessSignUp(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        setSuccessSignUp(false);
        console.log(`Возникла ошибка при регистрации пользователя, ${err}`);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogin(data) {
    auth
      .authorization(data)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        setUserEmail(data.email);
        navigate('/');
      })
      .catch((err) => {
        setSuccessSignUp(false);
        console.log(err);
      });
  }

  function logout() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    setUserEmail('')
  }

  function checkToken() {
    const token = localStorage.getItem('token');
    auth
      .checkValidToken(token)
      .then((data) => {
        if (!data) {
          return;
        }
        setLoggedIn(true);
        setUserEmail(data.data?.email);
        navigate('/');
      })
      .catch((err) => setLoggedIn(false));
  }

  useEffect(() => {
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header email={userEmail} logout={logout} loggedIn={loggedIn} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  cards={cards}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/sign-up"
              element={<Register handleRegistration={handleRegistration} />}
            />
            <Route path="*" element={loggedIn ? <Navigate to="/" replace />  : <Navigate to="/sign-in" replace />} />    
          </Routes>

          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            onLoading={isLoading}
          />
        </div>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccessSignUp}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
