import './index.css';
import {
  editProfileButton,
  userNameInput,
  userOccupationInput,
  formEditElement,
  addProfileButton,
  formAddElement,
  formEditAvatar,
  iconAvatarEdit,
} from '../utils/elements.js';
import { Card } from '../components/Сard.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationConfig } from '../utils/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
let userId;

// валидация попапов
const popupEditValidate = new FormValidator(validationConfig, formEditElement);
popupEditValidate.enableValidation();
const popupAddValidate = new FormValidator(validationConfig, formAddElement);
popupAddValidate.enableValidation();
const profileAvatarEditValidate = new FormValidator(
  validationConfig,
  formEditAvatar
);
profileAvatarEditValidate.enableValidation();

//Popup подтверждения удаления
const popupConfirm = new PopupWithConfirmation('#confirmpopup');
popupConfirm.setEventListeners();

//инфо о пользователе
const profileInfo = new UserInfo({
  userNameSelector: '.profile__username',
  userOccupationSelector: '.profile__occupation',
  userAvatarSelector: '.profile__avatar',
});

// наполнение страницы карточками
const renderedCard = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      renderedCard.addItem(cardElement);
    },
  },
  '.elements'
);

function handleCardClick(name, link) {
  popupZoomPhoto.open(name, link);
}

//создание карточки
function createCard(data) {
  const card = new Card(
    data,
    '#mesto-template',
    handleCardClick,
    {
      handleDeleteIconClick: (card) => {
        popupConfirm.open();
        popupConfirm.setSubmitAction(() => {
          api
            .removeCard(data)
            .then((res) => {
              card.deleteCard(res);
              popupConfirm.close();
            })
            .catch((err) => {
              console.log(`При удалении карточки возникла ошибка, ${err}`);
            });
        });
      },
      handleCardLike: () => {
        if (!card.isLiked()) {
          api
            .putLike(data._id)
            .then((data) => {
              card.likeCard(data.likes.length);
            })
            .catch((err) => {
              console.log(`При добавлении лайка возникла ошибка, ${err}`);
            });
        } else {
          api
            .deleteLike(data._id)
            .then((data) => {
              card.likeCard(data.likes.length);
            })
            .catch((err) => {
              console.log(`При удалении лайка возникла ошибка, ${err}`);
            });
        }
      },
    },
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'c5c2f5c6-6682-49c0-9c82-73ce1417a53d',
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([data, cards]) => {
    userId = data._id;
    profileInfo.setUserInfo({
      userName: data.name,
      userOccupation: data.about,
    });
    renderedCard.renderItems(cards);
    profileInfo.setAvatar(data.avatar);
  })
  .catch((err) => {
    console.log(`Возникла глобальная ошибка, ${err}`);
  });

//Popup с картинкой
const popupZoomPhoto = new PopupWithImage('#photopopup');
popupZoomPhoto.setEventListeners();

// Popup смены аватарки
const popupEditeAvatar = new PopupWithForm('#updatepopup', {
  callbackSubmitForm: (data) => {
    popupEditeAvatar.putSavingProcessText();
    api
      .setUserAvatar(data)
      .then((res) => {
        profileInfo.setAvatar(res.avatar);
        popupEditeAvatar.close();
      })
      .catch((err) => {
        console.log(`При обновлении аватара возникла ошибка, ${err}`);
      })
      .finally(() => {
        popupEditeAvatar.returnSavingProcessText();
      });
  },
});
popupEditeAvatar.setEventListeners();

//Popup редактирования профиля
const popupEditeProfile = new PopupWithForm('#editpopup', {
  callbackSubmitForm: (userProfileData) => {
    popupEditeProfile.putSavingProcessText();
    api
      .setProfileInfo(userProfileData)
      .then((res) => {
        profileInfo.setUserInfo({
          userName: res.name,
          userOccupation: res.about,
        });
        popupEditeProfile.close();
      })
      .catch((err) => {
        console.log(`При редактировании профиля возникла ошибка, ${err}`);
      })
      .finally(() => {
        popupEditeProfile.returnSavingProcessText();
      });
  },
});
popupEditeProfile.setEventListeners();

//Popup добавления карточки места
const popupMestoWithForm = new PopupWithForm('#addpopup', {
  callbackSubmitForm: (data) => {
    popupMestoWithForm.putSavingProcessText();
    api
      .setNewCard(data)
      .then((res) => {
        const cardItem = createCard(res);
        renderedCard.addItem(cardItem);
        popupMestoWithForm.close();
      })
      .catch((err) => {
        console.log(`При добавлении карточки возникла ошибка, ${err}`);
      })
      .finally(() => {
        popupMestoWithForm.returnSavingProcessText();
      });
  },
});
popupMestoWithForm.setEventListeners();

// Слушатель на иконку изменения аватара
iconAvatarEdit.addEventListener('click', function () {
  popupEditeAvatar.open();
});

// Слушатель на иконку редактирования профиля
editProfileButton.addEventListener('click', function () {
  popupEditeProfile.open();
  popupEditValidate.resetValidate();
  const actualUserInfo = profileInfo.getUserInfo();
  userNameInput.value = actualUserInfo.userName;
  userOccupationInput.value = actualUserInfo.userOccupation;
});

// Слушатель на кнопку добавления места
addProfileButton.addEventListener('click', () => {
  popupMestoWithForm.open();
  popupAddValidate.resetValidate();
});
