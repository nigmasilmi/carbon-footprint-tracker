import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';


const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertContext;
    const { logIn, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'Email o password incorrecto') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { email, password } = user;
    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Por favor rellene todos los campos', 'danger');
        } else {
            logIn({
                email,
                password
            })
        }

    }

    return (
        <div className="form-container">
            Autenticación <span className='text-primary'>de Usuario</span>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="pass">password</label>
                    <input type="password" name="password" value={password} onChange={onChange} />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" />

            </form>

        </div>
    )
}

export default Login;
