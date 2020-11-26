import React, { useContext, useRef, useEffect } from 'react';
import ViajeContext from '../../context/viajes/viajeContext';

const ViajesFilter = () => {
    const viajeContext = useContext(ViajeContext);
    const text = useRef('');
    const { clearFilter, filterViajes, filtered } = viajeContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
    });

    const onChange = e => {
        if (text.current.value !== '') {
            filterViajes(e.target.value);
        } else {
            clearFilter();
        }
    };
    return (
        <form>
            <input
                ref={text} type="text"
                placeholder="Filtrar viajes por usuario, origien o destino"
                onChange={onChange}
            />
        </form>
    )
}

export default ViajesFilter;
