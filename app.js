const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//require('dotenv/config');

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Import Routes
const pilotRoute = require('./routes/pilot_routes');
app.use('/pilot', pilotRoute);


// ROUTES
app.get('/', (req, res) => {
    res.send('AgroRIEGO Backend Home');
});

// CONNECT TO MONGODB
const url = "mongodb://localhost:27017/agroriego"; /* Local */
// const url = "mongodb+srv://pilotuser:*agropilot*@mongo-onepe.dymvq.mongodb.net/agroriego?retryWrites=true&w=majority";
mongoose.connect(
    url, 
    { useNewUrlParser: true }, 
    () => console.log('Connected to Mongo DB')
);

// LISTENING TO THE SERVER
app.listen(3000);
