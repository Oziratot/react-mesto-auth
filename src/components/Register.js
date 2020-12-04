import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    
    const [userData, setUserData] = React.useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const {name, value} = e.target;
        setUserData((data) => ({
            ...data,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = userData;
        onRegister(password, email);
    } 

    return (
        <form name='sign-in' 
            className="popup__container popup__container_type_sign"
            onSubmit={handleSubmit}
            noValidate>

            <p className="popup__text popup__text_type_sign">Регистрация</p>

            <label className="popup__field popup__field_type_sign">
                <input  type="email"
                        className="popup__input popup__input_type_sign"
                        id="email"
                        name="email"
                        value={userData.email || ''}
                        onChange={handleChange}
                        placeholder="Email"
                        required />
                <span className="popup__input-error" id="email-input-error"></span>
            </label>
            <label className="popup__field popup__field_type_sign">
                <input  type="password"
                        className="popup__input popup__input_type_sign"
                        id="password"
                        name="password"
                        value={userData.password || ''}
                        onChange={handleChange}
                        placeholder="Пароль"
                        required />
                <span className='popup__input-error' id="password-error"></span>
            </label>
            <button type="submit" className="popup__save-btn popup__save-btn_type_sign">Зарегистрироваться</button>
            <div className="popup__signin">
                <p className="popup__undertext">Уже зарегистрированы?&nbsp;</p>
                <Link to="sign-in" className="popup__signin-link">Войти</Link>
            </div>
        </form>
    );
}

export default Register;