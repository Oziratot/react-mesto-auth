import React from 'react'

function PopupWithForm({ name, isOpen, onClose, title, children, submitButtonText, onSubmit }) {
    return (
        <div className={`popup popup_modal_type_${name} ${isOpen && 'popup_opened'}`}>
            <form name={`${name}`} 
                className={`popup__container popup__container_type_${name}`}
                onSubmit={onSubmit} 
                noValidate>
                    
                    <button type="button" 
                            className="popup__close-btn" 
                            onClick={onClose}></button>

                    <p className="popup__text">{title}</p>
                    {children}
                    <button type="submit" className="popup__save-btn">{submitButtonText}</button>
            </form>
        </div>
    )
}

export default PopupWithForm