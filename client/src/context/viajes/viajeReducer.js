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

export default (state, action) => {
    switch (action.type) {
        case ADD_VIAJE:
            return { ...state, viajes: [...state.viajes, action.payload] }
        case VIAJE_ERROR:
            return { ...state, error: action.payload }
        case UPDATE_VIAJE:
            return {
                ...state,
                viajes: state.viajes.map(viaje => viaje.id === action.payload.id ? action.payload : viaje)
            }

        case DELETE_VIAJE:
            return {
                ...state,
                viajes: state.viajes.filter(viaje => viaje.id !== action.payload)
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case FILTER_VIAJE:
            return {
                ...state,
                filtered: state.viajes.filter(viaje => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return viaje.usuario.match(regex) || viaje.origen.match(regex) || viaje.destino.match(regex)
                })

            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        default:
            return state;
    }
}