import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_photo ${card.link ? 'popup_open' : ''}`}>
      <div className="popup__photocontainer">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card.link} alt={card.name} className="popup__photo" />
        <h3 className="popup__heading">{card.name}</h3>
      </div>
    </div>
  );
}
export default ImagePopup;
