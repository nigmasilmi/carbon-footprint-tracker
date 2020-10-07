import {
    ADD_VIAJE,
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


        default:
            return state;
    }
}