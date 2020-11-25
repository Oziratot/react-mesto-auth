import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value)
    }

    return (
        <PopupWithForm  name="avatar"
                          title="Обновить аватар"
                          isOpen={isOpen}
                          onClose={onClose}
                          onSubmit={handleSubmit}
                          submitButtonText="Обновить"
                          children={
                              <label className="popup__field">
                                <input  type="url" 
                                        className="popup__input popup__input_type_image-link" 
                                        id="place-url" 
                                        name="link" 
                                        placeholder="Ссылка на аватар"
                                        ref = {avatarRef}
                                        required />
                                <span className="popup__input-error" id="place-url-error"></span>
                              </label>
                          }/>
    )
}

export default EditAvatarPopup;