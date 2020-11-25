import React, { useState, useContext, useEffect } from 'react';
import Viajes from '../viajes/Viajes';
import ViajeContext from '../../context/viajes/viajeContext';


const ViajeForm = () => {
    const viajeContext = useContext(ViajeContext);
    const { addViaje, current, clearCurrentViaje, updateViaje } = viajeContext;

    useEffect(() => {
        if (current !== null) {
            setViaje(current);
        } else {
            setViaje({
                id: 0,
                usuario: '',
                origen: '',
                destino: '',
                medio: '',
                kms: 0,
                numero_viajeros: 0,
                ida_y_vuelta: true,
                fecha_viaje: '',
                huella_carbono_total: 0
            })
        }
    }, [viajeContext, current])

    const [viaje, setViaje] = useState({
        id: 0,
        usuario: '',
        origen: '',
        destino: '',
        medio: '',
        kms: 0,
        numero_viajeros: 0,
        ida_y_vuelta: true,
        fecha_viaje: '',
        huella_carbono_total: 0
    });

    // No olvidar adaptar al acoplar BBDD const { _id, usuario, origen, destino, medio, kms, numero_viajeros, ida_y_vuelta, fecha_viaje, huella_carbono_total } = viaje

    const { id, usuario, origen, destino, medio, kms, numero_viajeros, ida_y_vuelta, fecha_viaje, huella_carbono_total } = viaje

    const onChange = e => setViaje({ ...viaje, [e.target.name]: e.target.value });

    const clearAll = () => {
        clearCurrentViaje();
    }

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addViaje(viaje);
        } else {
            updateViaje(viaje);

        }

        clearAll();
    }

    {/* temporal mientras se ensambla funcionalmente front y back con data hardcoded */ }
    const doble = 2;
    const factor = 0.2;
    const editStyle = { border: '1px solid #f0a7ae', padding: '6px', transition: 'all 400ms ease' }
    return (
        <div style={current !== null ? editStyle : null}>
            <form onSubmit={onSubmit}>
                <h2 className="text-primary">{current !== null ? 'Editar Viaje' : 'Registrar viaje'}</h2>
                <input type="text" placeholder="usuario" name="usuario" value={usuario} onChange={onChange} />
                <input type="text" placeholder="origen" name="origen" value={origen} onChange={onChange} />
                <input type="text" placeholder="destino" name="destino" value={destino} onChange={onChange} />
                <input type="text" placeholder="medio" name="medio" value={medio} onChange={onChange} />
                <label>Número de kms de origen a destino</label>
                <input type="number" name="kms" value={kms} onChange={onChange} />
                <label>Número total de viajeros</label>
                <input type="number" name="numero_viajeros" value={numero_viajeros} onChange={onChange} />
                <input type="radio" name="ida_y_vuelta" value={true} /> Ida y Vuelta {' '}
                <input type="radio" name="ida_y_vuelta" value={false} /> Sólo Ida {' '}
                <input type="date" placeholder="fecha del viaje" name="fecha_viaje" value={fecha_viaje} onChange={onChange} />
                {/* temporal mientras se ensambla funcionalmente front y back con data hardcoded */}
                <input type="text" placeholder="huella de carbono calculada" name="huella_carbono_total" value={kms * numero_viajeros * doble * factor} onChange={onChange} />
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