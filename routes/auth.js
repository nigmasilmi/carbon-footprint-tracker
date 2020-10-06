const express = require('express');
const router = express.Router();


// @route   GET api/auth
// @desc    Get the logged in user
// @access  Private
router.get('/', (req, res) => {
    res.send('Obtaining the logged in user');
});


// @route   POST api/auth
// @desc    Login a user: with authentication and getting the web token
// @access  Public
router.post('/', (req, res) => {
    res.send('Loggin a user in');
});




module.exports = router;