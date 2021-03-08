const express = require('express');
const Pilot = require('../models/Pilot');
const router = express.Router();

// Get data from Mongo DB
router.get('/', async(req, res) => {
    try {
        const pilot = await Pilot.find();
        res.json(pilot);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get a specific data from Mongo DB
router.get('/:pilotId', async(req, res) => {
    try {
        const pilot = await Pilot.findById(req.params.pilotId);
        res.json(pilot);    
    } catch (err) {
        res.json({ message: err });
    }
    
    
});

// Insert Data into Mongo DB
router.post('/', async(req, res) => {
    const pilot = new Pilot({
        humedadSensor1: req.body.humedadSensor1,
        humedadSensor2: req.body.humedadSensor2
    });
    try {
        const savedPilot = await pilot.save();
        res.json(savedPilot);
    } catch (err) {
        res.json({ message: err });
    } 
});

// Delete data from Mongo DB
router.delete('/:pilotId', async(res, req) => {
    try {
        const removedPilot = await Pilot.remove({ _id: req.params.pilotId });
        res.json(removedPilot);
    } catch (err) {
        res.json({ message: err });
    }
});

// Update data
router.patch('/:pilotId', async (req, res) => {
    try {
        const updatedPilot = await Pilot.updateOne({ _id: req.params.pilotId }, { $set: {
            humedadSensor1: req.body.humedadSensor1
        }});
        res.json(updatedPilot);        
    } catch (err) {
        res.json({ message: err });
    }
    
});

module.exports = router;