import React, { useReducer } from 'react';
import uuid from 'uuid';
import ViajeContext from './viajeContext';
import viajeReducer from './viajeReducer';
import {
    ADD_VIAJE,
    DELETE_VIAJE,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_VIAJE,
    FILTER_VIAJE,
    CLEAR_FILTER
} from '../types';

const ViajeState = props => {
    const initialState = {
        viajes: [
            {
                id: '1',
                usuario: 'Marta Uno',
                origen: 'Providencia 123',
                destino: 'Tobalaba 345',
                medio: 'metro_subway',
                kms: 12,
                numero_viajeros: 2,
                ida_y_vuelta: true,
                fecha_viaje: '2020-10-06T23:05:42.506+00:00',
                huella_carbono_total: 1.23
            },
            {
                id: '2',
                usuario: 'Juan Dos',
                origen: 'Macul 123',
                destino: 'Bahia 345',
                medio: 'bus_transantiago',
                kms: 20,
                numero_viajeros: 1,
                ida_y_vuelta: true,
                fecha_viaje: '2020-10-07T23:05:42.506+00:00',
                huella_carbono_total: 2.23

            },
            {
                id: '3',
                usuario: 'Javier Tres',
                origen: 'Santiago de Chile',
                destino: 'Barcelona España',
                medio: 'avion_internacional',
                kms: 12345678,
                numero_viajeros: 1,
                ida_y_vuelta: true,
                fecha_viaje: '2020-10-08T23:05:42.506+00:00',
                huella_carbono_total: 40.23

            },

        ]

    };
    const [state, dispatch] = useReducer(viajeReducer, initialState);

    // Actions
    // Add Viaje
    const addViaje = viaje => {
        // generar un id temporal mientras se acopla el funcionamiento front/back con data hardcoded
        viaje.id = String(Math.floor(Math.random() * Math.floor(5))) + 'abcdHI' + String(Math.floor(Math.random() * Math.floor(5)));
        dispatch({ type: ADD_VIAJE, payload: viaje });
    }
    //Delete Viaje
    //Set Current Viaje
    //Update Viaje
    // Filter related. Not for now
    return (
        <ViajeContext.Provider value={{ viajes: state.viajes }}>
            {props.children}
        </ViajeContext.Provider>
    )
}
export default ViajeState;