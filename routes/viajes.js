const express = require('express');
const router = express.Router();


// @route   GET api/viajes
// @desc    Get all the viajes for a specific user or all viajes in case of the user logged in is the Environment Care Director
// @access  Private
router.get('/', (req, res) => {
    res.send('Getting all the viajes for the logged in user');
});

// @route   POST api/viajes
// @desc    Create a new viaje
// @access  Private
router.post('/', (req, res) => {
    res.send('Creating a new viaje');
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