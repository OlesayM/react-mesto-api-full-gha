import imgSuccess from '../images/Success.svg';
import imgError from '../images/Error.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? 'popup_open' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__info-tooltip">
          <img
            className="popup__image"
            src={isSuccess ? imgSuccess : imgError}
          />
          <h3 className="popup__title">
            {isSuccess
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
