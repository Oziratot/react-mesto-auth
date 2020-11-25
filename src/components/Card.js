import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    function handleClick() {
        onCardClick(card);
    };

    function handleLikeClick() {
        onCardLike(card);
    };

    function handleDeleteClick() {
        onCardDelete(card);
    }

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`places-grid__delete-btn ${isOwn ? 'places-grid__delete-btn_visible' : 'places-grid__delete-btn_hidden'}`)

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`places-grid__like-btn ${isLiked ? 'places-grid__like-btn_active' : ''}`);

    return (
        <li className="places-grid__element">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            
            <img className='places-grid__image' 
                 src={card.link} 
                 alt={card.name} 
                 onClick={handleClick}/>

            <div className='places-grid__description'>
                <h2 className="places-grid__text">{card.name}</h2>
                <div className="places-grid__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="places-grid__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card