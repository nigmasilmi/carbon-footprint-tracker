import React, { useState, useContext, useEffect } from 'react';
import ViajeContext from '../../context/viajes/viajeContext';


const ViajeForm = () => {
    const viajeContext = useContext(ViajeContext);
    const { addViaje, current, clearCurrentViaje, updateViaje } = viajeContext;

    useEffect(() => {
        if (current !== null) {
            setViaje(current);
        } else {
            setViaje({
                origen: '',
                destino: '',
                medio_name: 'metro_subway',
                kms: 0,
                numero_viajeros: 0,
                ida_y_vuelta: 'iyv',
                fecha_viaje: '',
            })
        }
    }, [viajeContext, current])

    const [viaje, setViaje] = useState({
        origen: '',
        destino: '',
        medio_name: 'metro_subway',
        kms: 0,
        numero_viajeros: 0,
        ida_y_vuelta: 'iyv',
        fecha_viaje: '',
    });

    const { origen, destino, medio_name, kms, numero_viajeros, fecha_viaje } = viaje

    const onChange = e => {
        setViaje({ ...viaje, [e.target.name]: e.target.value });
    };

    const clearAll = () => {
        clearCurrentViaje();
    }

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addViaje(viaje);
            clearAll();
        } else {
            updateViaje(viaje);

        }

        clearAll();
    }

    const editStyle = { border: '1px solid #f0a7ae', padding: '6px', transition: 'all 400ms ease' }
    return (
        <div style={current !== null ? editStyle : null}>
            <form onSubmit={onSubmit}>
                <h2 className="text-primary">{current !== null ? 'Editar Viaje' : 'Registrar viaje'}</h2>
                {/* <input type="text" placeholder="usuario" name="usuario" value={usuario} onChange={onChange} /> */}
                <input type="text" placeholder="origen" name="origen" value={origen} onChange={onChange} />
                <input type="text" placeholder="destino" name="destino" value={destino} onChange={onChange} />
                <label>Medio de transporte</label>
                <select name="medio_name" value={medio_name} onChange={onChange}>
                    <option value="metro_subway">Metro</option>
                    <option value="auto_gasolina">Auto</option>
                    <option value="camioneta_diesel">Camioneta</option>
                    <option value="motocicleta_gasolina">Motocicleta</option>
                    <option value="bus_transantiago">Transantiago</option>
                    <option value="bus_privado">Bus privado</option>
                    <option value="avion_chile">Avión nacional</option>
                    <option value="avion_internacional">Avión internacional</option>
                    <option value="caminando">Caminando</option>
                </select>
                <label>Número de kms de origen a destino</label>
                <input type="number" name="kms" value={kms} onChange={onChange} />
                <label>Número total de viajeros</label>
                <input type="number" name="numero_viajeros" value={numero_viajeros} onChange={onChange} />
                <input type="radio" name="ida_y_vuelta" value="iyv" onChange={onChange} /> Ida y Vuelta {' '}
                <input type="radio" name="ida_y_vuelta" value="ida" onChange={onChange} /> Sólo Ida {' '}
                <input type="text" placeholder="fecha del viaje mm-dd-yyyy" name="fecha_viaje" value={fecha_viaje} onChange={onChange} />
                <div>
                    <input type="submit" value={current !== null ? 'Guardar cambios' : 'Registrar viaje'} className="btn btn-primary btn-block"></input>
                </div>
                {current && <div>
                    <button className="btn btn-light btn-block"
                        onClick={clearAll}
                    >Limpiar
                    </button></div>}
            </form>
        </div>
    )
}

export default ViajeForm