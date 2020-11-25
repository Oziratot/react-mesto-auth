import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardList, setCardList] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, cards]) => {
        setCurrentUser(data);
        setCardList(cards);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  //opening functions for popups
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);

  }

  //full image of card
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //setting new user info and avatar
  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(link) {
    api.setUserAvatar(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //"like" and "delete" card functions
  function handleLikeCard(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cardList.map((c) => c._id === card._id ? newCard : c);
        setCardList(newCards);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleDeleteCard(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cardList.filter((c) => c._id !== card._id);
        setCardList(newCards);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //add new card
  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCardList([newCard, ...cardList]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  //closing all popups
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      
      <div className="App">

        <div className="page">
          
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
                    
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm  name="confirm"
                          title="Вы уверены?"
                          submitButtonText="Да"/>

          <ImagePopup onClose={closeAllPopups}
                      card={selectedCard}/>

          <Header />

          <Main onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleLikeCard}
                onCardDelete={handleDeleteCard}
                cards={cardList}/>

          <Footer />

        </div>

      </div>

    </CurrentUserContext.Provider>
  );

}

export default App;
