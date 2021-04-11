const mongoose = require('mongoose');

const PilotSchema = mongoose.Schema({
    nodo: {
        type: String,
        required: true
    },
    humedad: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pilot', PilotSchema);