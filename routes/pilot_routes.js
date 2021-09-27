const express = require('express');
const pool = require('../db/mariadb.js');
const router = express.Router();
// const mysqlConnection = require('../db/mariadb.js');

// POST Sensor Data
router.post('/pilot', async function(req, res) {
  try {
    
    if (req.body.humedad <= 50) {
      recomendacion = "DEBE regar el cultivo";
    } else {
      recomendacion = "No es necesario regar el cultivo";
    }

    const { nodo, humedad, recomendacion } = req.body;
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

// GET Sensor Data - Last 6 values
router.get('/pilot-6', async function (req, res) {
  try {
    
    const sqlQuery = 'SELECT * FROM pilots ORDER BY date DESC LIMIT 6';
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);

  } catch (error) {
    
    res.status(400).send(error.message);
    
  }
});
  
module.exports = router;