import React, { Fragment, useContext } from 'react';
import ViajeContext from '../../context/viajes/viajeContext';
import ViajeItem from './ViajeItem';


const Viajes = () => {
    const viajeContext = useContext(ViajeContext);
    const { viajes } = viajeContext;

    return (
        <Fragment>
            <h3>Viajes Registrados</h3>

            {viajes.map(viaje => <ViajeItem key={viaje.id} viaje={viaje} />)}
            {/* {viajes.map(viaje => <ViajeItem key={contact._id} viaje={viaje} />)} */}
        </Fragment>

    )
}

export default Viajes