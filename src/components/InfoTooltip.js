import React from 'react';
import successImage from '../images/registration-success.svg';
import errorImage from '../images/registration-error.svg'; 

function InfoTooltip({ isOpen, onClose, isRegSuccess }) {
    return (
        <div className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__container popup__container_type_infotooltip">

                    <button type="button"
                            className="popup__close-btn"
                            onClick={onClose}></button>
                    
                    <img className="popup__image-infotooltip" src={isRegSuccess ? successImage : errorImage} alt=''/>
                    <p className="popup__text popup__text_type_infotooltip">{isRegSuccess ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
            </div>
        </div>
    )
}

export default InfoTooltip;