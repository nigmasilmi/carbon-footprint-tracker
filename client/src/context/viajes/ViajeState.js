import React, { useReducer } from 'react';
import axios from 'axios';
import ViajeContext from './viajeContext';
import viajeReducer from './viajeReducer';
import {
    GET_VIAJES,
    CLEAR_VIAJES,
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
        viajes: null,
        current: null,
        filtered: null,
        error: null

    };
    const [state, dispatch] = useReducer(viajeReducer, initialState);

    // Action Creators
    const getViajes = async () => {
        try {
            const res = await axios.get('/api/viajes');
            dispatch({ type: GET_VIAJES, payload: res.data });
        } catch (error) {
            dispatch({ type: VIAJE_ERROR, payload: error.response.msg });
        }
    }
    // clear Viajes
    const clearViajes = () => {
        dispatch({ type: CLEAR_VIAJES })
    }
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
    // // Update viaje
    const updateViaje = async viaje => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.put(`/api/viajes/${viaje._id}`, viaje, config);
            dispatch({ type: UPDATE_VIAJE, payload: res.data });


        } catch (error) {
            dispatch({ type: VIAJE_ERROR, payload: error.response.msg })
        }
    };
    // // Delete Viaje
    const deleteViaje = async id => {
        try {
            await axios.delete(`/api/viajes/${id}`);
            dispatch({ type: DELETE_VIAJE, payload: id });

        } catch (error) {
            dispatch({ type: VIAJE_ERROR, payload: error.response.msg })
        }
    };

    // // Set Current viaje
    const setCurrentViaje = viaje => {
        console.log('viaje en editar', viaje);
        const humanFecha = String(new Date(viaje.fecha_viaje).toLocaleDateString('es-CL'));
        dispatch({ type: SET_CURRENT, payload: { viaje, humanFecha } });
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
                getViajes,
                addViaje, deleteViaje,
                setCurrentViaje, clearCurrentViaje,
                updateViaje,
                filterViajes, clearFilter,
                clearViajes
            }
        }>
            {props.children}
        </ViajeContext.Provider>
    )
}
export default ViajeState;