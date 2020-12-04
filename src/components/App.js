import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardList, setCardList] = React.useState([]);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isRegSuccess, setIsRegSuccess] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const history = useHistory();

  // getting initial page
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

  //checking if user is authorized
  //defining function inside useEffect
  //because of eslint warning
  React.useEffect(() => {
    const jwt = localStorage.getItem(('jwt'));
    if (jwt) {
      auth.checkToken(jwt)
          .then((res) => {
            if (res) {
              setLoggedIn(true);
              setEmail(res.data.email);
              history.push('/');
            }
          })
          .catch((err) => {
            console.log(err);
          })
    }
  }, [history]);

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
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }

  
  // new user registration
  function handleRegister(password, email) {
    auth.register(password, email)
        .then((res) => {
          if (res) {
            history.push("/sign-in");
            setIsRegSuccess(true);
            setInfoTooltipOpen(true);
          } else {
            setIsRegSuccess(false);
            setInfoTooltipOpen(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsRegSuccess(false);
          setInfoTooltipOpen(true);
        })
  }

  //user login
  function handleLogin(password, email) {
    auth.authorize(password, email)
        .then((res) => {
          if (res) {
            localStorage.setItem('jwt', res.token);
            setLoggedIn(true);
            setEmail(email);
            history.push('/')
          } else {
            setIsRegSuccess(false);
            setInfoTooltipOpen(true);
          }
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        })
  }

  //logout
  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/sign-in');
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

          <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isRegSuccess={isRegSuccess} />

          <Header loggedIn={loggedIn} email={email} onLogout={handleLogout}/>

          <Switch>

            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>

            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>

            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} 
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleLikeCard}
                  onCardDelete={handleDeleteCard}
                  cards={cardList}/>

            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="sign-in" />}
            </Route>
            
          </Switch>

          <Footer />
          
        </div>

      </div>

    </CurrentUserContext.Provider>
    
  );

}

export default App;
