import React from 'react';
import propTypes from 'prop-types';


const ViajeItem = ({ viaje }) => {

    // const { _id, usuario, origen, destino, medio, kms, numero_viajeros, ida_y_vuelta, fecha_viaje, huella_carbono_total } = viaje
    const { id, usuario, origen, destino, medio, kms, numero_viajeros, ida_y_vuelta, fecha_viaje, huella_carbono_total } = viaje
    console.log(huella_carbono_total);
    const dOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    return (
        <div className="card">
            <h4 className="text-primary text-left ">
                {kms} kms en {medio} el {String(new Date(fecha_viaje).toLocaleDateString('es-CL'))} <span style={{ float: 'right' }} className={huella_carbono_total > 2 ? 'badge alert-primary' : 'badge badge-success'}>{viaje.huella_carbono_total}  kgC02</span>
            </h4>
            <ul>
                <li> de {origen} a {destino}</li>
                <li>viajan {numero_viajeros} personas</li>
                <li> {ida_y_vuelta ? 'si' : 'no'} es un viaje ida y vuelta</li>
                <small>identificador del viaje: {id} // </small>
                <small>Registro hecho por: {usuario}</small>
                <li><button className="btn btn-dark btn-sm">Editar</button>
                    <button className="btn btn-danger btn-sm">Eliminar</button></li>
            </ul>
        </div>

    )
}

ViajeItem.propTypes = { viaje: propTypes.object.isRequired }
export default ViajeItem