import React from 'react';

function Login({onLogin}) {

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
        if (!password || !email) {
            return;
        }
        onLogin(password, email);
        setUserData({
            email: '',
            password: ''
        })
    }

    return (
        <form name='sign-in' 
            onSubmit={handleSubmit}
            className='popup__container popup__container_type_sign'
            noValidate>

            <p className="popup__text popup__text_type_sign">Вход</p>

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
            <button type="submit" className="popup__save-btn popup__save-btn_type_sign">Войти</button>
        </form>
    );
}

export default Login