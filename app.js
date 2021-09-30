const express = require('express');
const app = express();
const cors = require('cors');

// Middlewares
app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(cors());
app.options('*', cors());

// Routes
app.use(require('./routes/pilot_routes.js'));


// Start WebService
app.listen(app.get('port'), () => {
    console.log('Agroriego Pilot WebService listening on port 3000');
});
