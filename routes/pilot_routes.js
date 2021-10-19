const express = require('express');
const pool = require('../db/mariadb.js');
const router = express.Router();
// const mysqlConnection = require('../db/mariadb.js');

// POST Sensor Data
router.post('/pilot', async function(req, res) {
  try {
        
    // Linear Regression for Humidity
    let hum = req.body.humedad;
    let linear_hum = 100 - (0.285714 * hum);
    let rounded_hum = Math.round(linear_hum);
    req.body.humedad = rounded_hum;

    let recomendacion = "";
    if (req.body.humedad <= 50) {
      recomendacion = "DEBE regar el cultivo";
    } else {
      recomendacion = "No es necesario regar el cultivo";
    }

    // let humidity = 100;
    // if (req.body.humedad >= 100) {
    //   req.body.humedad = humidity;
    // } 

    const { nodo, humedad } = req.body;
    const sqlQuery = 'INSERT INTO pilots (nodo, humedad, recomendacion) VALUES (?,?,?)';
    const result = await pool.query(sqlQuery, [nodo, humedad, recomendacion]);
    res.status(200).json({ userId: result.insertId });

  } catch (error) {
    res.status(400).send(error.message);
    
  }
});


// GET Sensor Data
router.get('/pilot', async function (req, res) {
  try {
    
    const sqlQuery = 'SELECT * FROM pilots';
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);

  } catch (error) {
    
    res.status(400).send(error.message);
    
  }
});

// GET Sensor Data - Last 2 values
router.get('/pilot-2', async function (req, res) {
  try {
    
    const sqlQuery = 'SELECT * FROM pilots ORDER BY date DESC LIMIT 2';
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);

  } catch (error) {
    
    res.status(400).send(error.message);
    
  }
});

// GET Sensor Data - Last 12 values
router.get('/pilot-6', async function (req, res) {
  try {
    
    const sqlQuery = 'SELECT * FROM pilots ORDER BY date DESC LIMIT 8';
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);

  } catch (error) {
    
    res.status(400).send(error.message);
    
  }
});
  
module.exports = router;