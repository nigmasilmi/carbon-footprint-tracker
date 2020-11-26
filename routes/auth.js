const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/Users');


// @route   GET api/auth
// @desc    Get the logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    // si pasa el middleware, entonces el req viene con el id del usuario, podemos usarlo para encontrarlo en la BD
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/auth
// @desc    Login a user: with authentication and getting the web token
// @access  Public
router.post('/', [
    check('email', 'Por favor ingrese un email válido').isEmail(),
    check('password', 'Por favor ingrese su contraseña').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        // si no existe el usuario con ese email indicar que las credenciales son incorrectas, sin decir cuál 
        if (!user) {
            res.status(400).json({ msg: 'Email o password incorrecto' });
        }
        // si llega hasta acá es porque el usuario existe, chequeamos entonces su password con bcrypt compare
        const isMatch = await bcrypt.compare(password, user.password);
        // si el password es incorrecto, detenemos la operación enviando el mensaje correspondiente al usuario
        if (!isMatch) {
            return res.status(400).json({ msg: 'Email o password incorrecto' });
        }
        //si llega hasta acá es que el password es correcto, entonces generamos el token y lo enviamos al cliente
        const payload = {
            user: {
                id: user._id

            }
        };
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        }, (err, token) => {
            if (err) {
                throw err;
            }
            res.json({ token });
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});




module.exports = router;