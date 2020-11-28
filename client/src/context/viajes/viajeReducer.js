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

export default (state, action) => {
    switch (action.type) {
        case GET_VIAJES:
            return { ...state, viajes: action.payload, loading: false }
        case CLEAR_VIAJES:
            return {
                ...state,
                viajes: null,
                filtered: null,
                current: null,
                error: null,
                loading: false
            }
        case ADD_VIAJE:
            return { ...state, viajes: [action.payload, ...state.viajes], loading: false }
        case UPDATE_VIAJE:
            return {
                ...state,
                viajes: state.viajes.map(viaje => viaje._id === action.payload._id ? action.payload : viaje),
                loading: false
            }
        case DELETE_VIAJE:
            return {
                ...state,
                viajes: state.viajes.filter(viaje => viaje._id !== action.payload),
                loading: false
            }
        case VIAJE_ERROR:
            return { ...state, error: action.payload }
        case SET_CURRENT:
            return {
                ...state,
                current: { ...action.payload.viaje, fecha_viaje: action.payload.humanFecha }
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