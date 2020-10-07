const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/Users');
const Medio = require('../models/Medios');
const Viaje = require('../models/Viajes');


// @route   GET api/viajes
// @desc    Get all the viajes for a specific user or all viajes in case of the user logged in is the Environment Care Director
// @access  Private
router.get('/', auth, async (req, res) => {
    // TODO validar primero si es the Environment Care Director o si es un usuario regular
    try {
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
    const userId = req.user.id;
    // console.log('user---------------------', user);
    const { origen, destino, medio, kms, numero_viajeros, ida_y_vuelta, fecha_viaje } = req.body;
    try {
        // encontramos el valor de conversión según el medio en el request
        const elMedio = await Medio.find({ nombre: medio }).select({ factor_de_conversion: 1 });
        const elFactor = elMedio[0].factor_de_conversion;
        // considerando si es ida y vuelta o no
        const goAndBack = (ida_y_vuelta ? 2 : 1);
        const calcHuellaCarbono = kms * numero_viajeros * goAndBack * elFactor;
        // integramos el cálculo al nuevo documento y guardamos en la colección
        const newViaje = new Viaje({ usuario: userId, origen, destino, medio, kms, numero_viajeros, ida_y_vuelta, fecha_viaje, huella_carbono_total: calcHuellaCarbono });
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
router.put('/:id', (req, res) => {
    res.send('Updating a viaje');
});

// @route   DELETE api/viajes/:id
// @desc    Delete a viaje. Only available to the Environment Care Director
// @access  Private
router.delete('/:id', (req, res) => {
    res.send('Deleting a viaje from the db');
});



module.exports = router;