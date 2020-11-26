import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ViajeContext from '../../context/viajes/viajeContext';
import ViajeItem from './ViajeItem';


const Viajes = () => {
    const viajeContext = useContext(ViajeContext);
    const { viajes, filtered } = viajeContext;

    if (viajes.length === 0) {
        return <h4>Añade un viaje para comenzar</h4>
    }
    return (
        <Fragment>
            <h3>Viajes Registrados</h3>
            <TransitionGroup>
                {filtered !== null ?
                    filtered.map(viaje =>
                        <CSSTransition key={viaje._id} timeout={5000} classNames="item">
                            <ViajeItem viaje={viaje} />
                        </CSSTransition>
                    ) :
                    viajes.map(viaje =>
                        <CSSTransition key={viaje._id} timeout={5000} classNames="item">
                            <ViajeItem viaje={viaje} />
                        </CSSTransition>
                    )
                }
            </TransitionGroup>


        </Fragment>

    )
}

export default Viajes