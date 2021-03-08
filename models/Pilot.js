const mongoose = require('mongoose');

const PilotSchema = mongoose.Schema({
    humedadSensor1: {
        type: Number,
        required: true
    },
    humedadSensor2: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pilot', PilotSchema);