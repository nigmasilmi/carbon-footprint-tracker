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
                id: 1,
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
                id: 2,
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
                id: 3,
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
    //Delete Viaje
    //Set Current Viaje
    //Update Viaje
    // Filter related. Not for now
    return (
        <ViajeContext.Provider value={{ contacts: state.contacts }}>
            {props.children}
        </ViajeContext.Provider>
    )
}