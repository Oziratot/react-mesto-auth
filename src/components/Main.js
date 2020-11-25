import React from 'react'
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards , onCardLike, onCardDelete }) {

  //using context
  const currentUser = React.useContext(CurrentUserContext);
      
      return (
        <main className="content">

          <section className="profile">
            <div className="profile__avatar-container" onClick={onEditAvatar}>
              <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля" />
            </div>
            <div className="profile__profile-info">
              <h1 className="profile__name">{currentUser.name}</h1>

              <button onClick={onEditProfile} 
                      type="button" 
                      className="profile__edit-btn"></button>

              <p className="profile__description">{currentUser.about}</p>
            </div>

            <button onClick={onAddPlace} 
                    type="button" 
                    className="profile__add-btn"></button>

          </section>

          <section className="places">
            <ul className="places-grid">
              {cards.map((card) => (
                <Card key={card._id} 
                      card={card} 
                      onCardClick={onCardClick}
                      onCardLike={onCardLike}
                      onCardDelete={onCardDelete}/>
              ))}
            </ul>
          </section>

        </main>
    );
}


export default Main