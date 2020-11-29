const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Medio = require('../models/Medios');
const Viaje = require('../models/Viajes');
const User = require('../models/Users');


// @route   GET api/viajes
// @desc    Get all the viajes for a specific user or all viajes in case of the user logged in is the Environment Care Director
// @access  Private
router.get('/', auth, async (req, res) => {
    // TODO validar primero si es the Environment Care Director o si es un usuario regular
    try {
        // TODO añadir permisos para administrador
        // todos los viajes
        // const viajes = await Viaje.find().sort({ fecha_viaje: -1 });
        // viajes del propio usuario
        const viajes = await Viaje.find({ usuario: req.user.id }).sort({ fecha_viaje: -1 });
        res.json(viajes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');

    }
});

// @route   POST api/viajes
// @desc    Create a new viaje
// @access  Private
router.post('/', [auth, [
    check('origen', 'Es necesario que indique la dirección de origen').not().isEmpty(),
    check('destino', 'Es necesario que indique la dirección de destino').not().isEmpty(),
    check('medio', 'Es necesario que seleccione el medio de transporte a utilizar').not().isEmpty(),
    check('kms', 'Por favor ingrese la cantidad de kilómetros que recorrerá').not().isEmpty(),
    check('numero_viajeros', 'Por favor indique cuántas personas en total hacen el viaje').not().isEmpty().isInt(),
    check('ida_y_vuelta', 'Por favor indique si su viaje es de ida y regreso'),
    check('fecha_viaje', 'Por favor indique la fecha de su viaje'),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log('lo que viene en el request de nuevo viaje', req.body)
    const userId = req.user.id;
    const { origen, destino, medio_name, kms, numero_viajeros, ida_y_vuelta, fecha_viaje } = req.body;
    try {
        //obtenemos el nombre de usuario desde su id
        const userObj = await User.find({ _id: userId });
        const userName = userObj[0].name;
        // encontramos el valor de conversión según el medio en el request
        const elMedioConTodo = await Medio.find({ nombre: medio_name });
        const { _id, nombre, factor_de_conversion } = elMedioConTodo[0];
        const medioNameFetched = nombre;

        // considerando si es ida y vuelta o no
        const goAndBack = (ida_y_vuelta === 'iyv' ? 2 : 1);
        const calcHuellaCarbono = (kms * numero_viajeros * goAndBack * factor_de_conversion).toFixed(2);
        // integramos el cálculo al nuevo documento y guardamos en la colección
        const newViaje = new Viaje({ usuario: userId, usuario_name: userName, origen, destino, medio: _id, medio_name: medioNameFetched, kms, numero_viajeros, ida_y_vuelta, fecha_viaje, huella_carbono_total: calcHuellaCarbono });
        const viaje = await newViaje.save();
        res.json(viaje);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

});

// @route   PUT api/viajes/:id
// @desc    Update a specific viaje
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const userId = req.user.id;
    console.log('lo que viene en el req body de editar', req.body);
    const { origen, destino, medio_name, kms, numero_viajeros, ida_y_vuelta, fecha_viaje } = req.body;
    //obtenemos el nombre de usuario desde su id
    const userObj = await User.find({ _id: userId });
    const usuario_name = userObj[0].name;
    // encontramos el valor de conversión según el medio en el request
    const elMedioConTodo = await Medio.find({ nombre: medio_name });
    const { nombre, factor_de_conversion } = elMedioConTodo[0];
    const medioNameFetched = nombre;
    // considerando si es ida y vuelta o no
    const goAndBack = (ida_y_vuelta === 'iyv' ? 2 : 1);
    const calcHuellaCarbono = (kms * numero_viajeros * goAndBack * factor_de_conversion).toFixed(2);


    // Reconstruir el viaje
    const viajeFields = {};
    if (origen) viajeFields.origen = origen;
    if (destino) viajeFields.destino = destino;
    if (usuario_name) viajeFields.usuario_name = usuario_name;
    if (medio_name) viajeFields.medio_name = medioNameFetched;
    if (kms) viajeFields.kms = kms;
    if (numero_viajeros) viajeFields.numero_viajeros = numero_viajeros;
    if (ida_y_vuelta) viajeFields.ida_y_vuelta = ida_y_vuelta;
    if (fecha_viaje) viajeFields.fecha_viaje = fecha_viaje;
    viajeFields.huella_carbono_total = calcHuellaCarbono;


    try {
        let viaje = await Viaje.findById(req.params.id);

        if (!viaje) return res.status(404).json({ msg: 'Viaje no encontrado' });

        // Make sure user owns contact
        if (viaje.usuario.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Operación no autorizada' });

        viaje = await Viaje.findByIdAndUpdate(
            req.params.id,
            { $set: viajeFields },
            { new: true }
        );

        res.json(viaje);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   DELETE api/viajes/:id
// @desc    Delete a viaje. Only available to the Environment Care Director
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const viaje = await Viaje.findById(req.params.id);

        if (!viaje) return res.status(404).json({ msg: 'No existe el viaje' });

        // Asegurarse de que el viaje haya sido registrado por el usuario

        if (viaje.usuario.toString() !== req.user.id)
            return res.status(401).json({ msg: 'Operación no autorizada' });

        await Viaje.findByIdAndRemove(req.params.id);
        res.json({ msg: 'Viaje eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



module.exports = router;