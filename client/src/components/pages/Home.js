import React from 'react';
import Viajes from '../viajes/Viajes';
import ViajeForm from '../viajes/ViajeForm';


const Home = () => {
    return (
        <div className="grid-2">
            <div><ViajeForm /></div>
            <div>
                <Viajes />
            </div>
        </div>
    )
}

export default Home