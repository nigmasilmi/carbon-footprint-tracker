const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/Users');




// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post('/', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'Por favor ingrese un email válido').isEmail(),
    check('password', 'Por favor ingrese un email de al menos 6 caracteres').isLength({ min: 6 })

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ msg: 'Ya existe un usuario con ese email' });
        }
        // if user does not exist, create it
        user = new User({ name, email, password });

        // hash the password before saving in DB

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save to DB
        await user.save();

        // send token back to the client
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
        }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;