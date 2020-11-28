import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ViajeContext from '../../context/viajes/viajeContext';
import ViajeItem from './ViajeItem';
import Spinner from '../layout/Spinner';


const Viajes = () => {
    const viajeContext = useContext(ViajeContext);
    const { viajes, filtered, getViajes, loading } = viajeContext;

    useEffect(() => {
        getViajes();
        // eslint-disable-next-line
    }, []);

    if (viajes !== null && viajes.length === 0 && !loading) {
        return <h4>Añade un viaje para comenzar</h4>
    }
    return (
        <Fragment>
            <h3>Viajes Registrados</h3>
            {viajes !== null && !loading ? (
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

            ) : <Spinner />}



        </Fragment>

    )
}

export default Viajes