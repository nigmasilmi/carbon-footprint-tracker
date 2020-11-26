import React, { useReducer } from 'react';
import axios from 'axios';
import ViajeContext from './viajeContext';
import viajeReducer from './viajeReducer';
import {
    ADD_VIAJE,
    VIAJE_ERROR,
    DELETE_VIAJE,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_VIAJE,
    FILTER_VIAJE,
    CLEAR_FILTER
} from '../types';

const ViajeState = props => {
    const initialState = {
        viajes: [],
        current: null,
        filtered: null,
        error: null

    };
    const [state, dispatch] = useReducer(viajeReducer, initialState);

    // Action Creators
    // // Add Viaje
    const addViaje = async viaje => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/viajes', viaje, config);
            dispatch({ type: ADD_VIAJE, payload: res.data });

        } catch (error) {
            dispatch({ type: VIAJE_ERROR, payload: error.response.msg })
        }

    }
    // // Delete Viaje
    const deleteViaje = id => {
        dispatch({ type: DELETE_VIAJE, payload: id });
    };
    // // Update viaje
    const updateViaje = viaje => {
        dispatch({ type: UPDATE_VIAJE, payload: viaje });
    };
    // // Set Current viaje
    const setCurrentViaje = viaje => {
        dispatch({ type: SET_CURRENT, payload: viaje });
    };
    // // Delete Current viaje
    const clearCurrentViaje = () => {
        dispatch({ type: CLEAR_CURRENT });
    };
    // // Filter Viajes
    const filterViajes = (text) => {
        dispatch({ type: FILTER_VIAJE, payload: text });
    };
    // // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ViajeContext.Provider value={
            {
                viajes: state.viajes,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addViaje, deleteViaje,
                setCurrentViaje, clearCurrentViaje,
                updateViaje,
                filterViajes, clearFilter
            }
        }>
            {props.children}
        </ViajeContext.Provider>
    )
}
export default ViajeState;