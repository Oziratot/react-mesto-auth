import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

    return (
        <PopupWithForm name="edit" 
                        title="Редактировать профиль" 
                        isOpen={isOpen}
                        onClose={onClose}
                        onSubmit={handleSubmit}
                        submitButtonText="Сохранить"
                        children={
                          <>
                            <label className="popup__field">
                              <input type="text"
                                    className="popup__input popup__input_type_name"
                                    placeholder="Имя"
                                    id="name-input"
                                    name="name"
                                    value={name || ''}
                                    onChange={handleNameChange}
                                    required
                                    minLength="2"
                                    maxLength="40" />
                              <span className="popup__input-error" id="name-input-error"></span>
                            </label>
                            <label className="popup__field">
                              <input type="text" 
                                  className="popup__input popup__input_type_description" 
                                  placeholder="Описание" 
                                  id="description-input" 
                                  name="description"
                                  value={description || ''}
                                  onChange={handleDescriptionChange}
                                  required 
                                  minLength="2" 
                                  maxLength="200" />
                              <span className="popup__input-error" id="description-input-error"></span>
                            </label>
                        </>
                        }/>
    );
}

export default EditProfilePopup;