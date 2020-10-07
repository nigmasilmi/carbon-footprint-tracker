import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
    return (
        <div className="navbar bg-primary">
            <h1><i className={icon}></i>{title}</h1>
            <ul>
                <li><Link to="/">Inicio</Link></li>
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