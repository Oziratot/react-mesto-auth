import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [newPlaceName, setNewPlaceName] = React.useState('');
    const [newPlaceLink, setNewPlaceLink] = React.useState('');

    function handleNewPlaceChange(e) {
        setNewPlaceName(e.target.value);
    }

    function handleNewPlaceLinkChange(e) {
        setNewPlaceLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: newPlaceName,
            link: newPlaceLink
        })
    }

    return (
        <PopupWithForm  name="add"
                          title="Новое место"
                          isOpen={isOpen}
                          onClose={onClose}
                          onSubmit={handleSubmit}
                          submitButtonText="Добавить"
                          children={
                            <>
                              <label className="popup__field">
                                <input  type="text" 
                                        className="popup__input popup__input_type_place" 
                                        id="place-input" 
                                        name="name" 
                                        placeholder="Название"
                                        value={newPlaceName}
                                        onChange={handleNewPlaceChange}
                                        required 
                                        minLength="1" 
                                        maxLength="30" />
                                <span className="popup__input-error" id="place-input-error"></span>
                              </label>
                              <label className="popup__field">
                                <input  type="url" 
                                        className="popup__input popup__input_type_image-link" 
                                        id="place-url" 
                                        name="link" 
                                        placeholder="Ссылка на картинку"
                                        value={newPlaceLink}
                                        onChange={handleNewPlaceLinkChange}
                                        required />
                                <span className="popup__input-error" id="place-url-error"></span>
                              </label>
                            </>
                          }/>
    )
}

export default AddPlacePopup;