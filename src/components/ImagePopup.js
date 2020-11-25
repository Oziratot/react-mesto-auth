import React from 'react'

function ImagePopup({ onClose, card }) {
    return (
        <div className={`popup popup_modal_type_photo ${(Object.keys(card).length !== 0) && 'popup_opened'}`}>
          <div className='popup__image-container'>

            <button type="button" 
                    className="popup__close-btn" 
                    onClick={onClose}></button>

            <img  className="popup__full-image" 
                  src={card.link} 
                  alt={card.name}/>
                  
            <p className="popup__image-title">{card.name}</p>
          </div>
        </div>
    );
}

export default ImagePopup