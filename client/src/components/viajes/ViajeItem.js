import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ViajeContext from '../../context/viajes/viajeContext';


const ViajeItem = ({ viaje }) => {
    const viajeContext = useContext(ViajeContext);
    const { deleteViaje, setCurrentViaje, clearCurrentViaje } = viajeContext;

    const { _id, usuario_name, origen, destino, medio_name, kms, numero_viajeros, ida_y_vuelta, fecha_viaje, huella_carbono_total } = viaje

    const onDelete = () => {
        deleteViaje(_id);
        clearCurrentViaje();
    };

    const fechaLegible = String(new Date(fecha_viaje).toLocaleDateString('es-CL')) === 'Invalid Date' ? fecha_viaje : String(new Date(fecha_viaje).toLocaleDateString('es-CL'))

    return (
        <div className="card">
            <div className="text-primary">{kms} kms en {medio_name} el {fechaLegible}</div>
            <div style={{ float: 'right' }} className={huella_carbono_total > 2 ? 'badge alert-primary' : 'badge badge-success'}>huella de carbono:{viaje.huella_carbono_total} kgC02</div>
            <ul>
                <li> de {origen} a {destino}</li>
                <li>viajan {numero_viajeros} personas</li>
                <li> {ida_y_vuelta === 'iyv' ? 'si' : 'no'} es un viaje ida y vuelta</li>
                <small>identificador del viaje: {_id} </small><br />
                <small>Registro hecho por: {usuario_name}</small>
                <li><button
                    className="btn btn-dark btn-sm"
                    onClick={() => setCurrentViaje(viaje)}
                >Editar</button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={onDelete}
                    >Eliminar
                    </button>
                </li>
            </ul>
        </div>

    )
}

ViajeItem.propTypes = { viaje: propTypes.object.isRequired }
export default ViajeItem