const express = require('express');
const router = express.Router();
const mysqlConnection = require('../db/mariadb.js');

// Insert Sensor Humidity Data
router.post('/pilot', (req, res) => {
    let data = {
        nodo: req.body.nodo,
        humedad: req.body.humedad
    };
    let sql = "INSERT INTO pilots SET ?";
    mysqlConnection.query(sql, data, (err,  results) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

// GET All data from Sensor Humidity
router.get('/pilot', (req, res) => {
    mysqlConnection.query('SELECT * FROM pilots', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });
  
  module.exports = router;