import React, { Fragment, useContext } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ViajesContext from '../../context/viajes/viajeContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const viajesContext = useContext(ViajesContext);

    const { isAuthenticated, logOut, user } = authContext;
    const { clearViajes } = viajesContext;

    const onLogout = () => {
        logOut();
        clearViajes();
    }
    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i><span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li><Link to="/register">Registro</Link></li>
            <li><Link to="/login">Log in</Link></li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <h1><i className={icon}></i>{title}</h1>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                {isAuthenticated ? authLinks : guestLinks}

            </ul>
        </div>
    )
};

Navbar.propTypes = {
    title: propTypes.string.isRequired,
    icon: propTypes.string
}

Navbar.defaultProps = {
    title: 'forEach CO2Tracking',
    icon: 'fas fa-leaf'
}

export default Navbar;