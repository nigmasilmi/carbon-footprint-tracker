import React, { useContext, useEffect } from 'react';
import Viajes from '../viajes/Viajes';
import ViajeForm from '../viajes/ViajeForm';
import ViajesFilter from '../viajes/ViajesFilter';
import AuthContext from '../../context/auth/authContext';


const Home = () => {
    const authContext = useContext(AuthContext);
    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="grid-2">
            <div><ViajeForm /></div>
            <div>
                <ViajesFilter />
                <Viajes />
            </div>
        </div>
    )
}

export default Home