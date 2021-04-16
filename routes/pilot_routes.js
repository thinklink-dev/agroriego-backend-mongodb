const express = require('express');
const pool = require('../db/mariadb.js');
const router = express.Router();
const mysqlConnection = require('../db/mariadb.js');

// Insert Sensor Humidity Data
// router.post('/pilot', (req, res) => {
//     let data = {
//         nodo: req.body.nodo,
//         humedad: req.body.humedad
//     };
//     let sql = "INSERT INTO pilots SET ?";
//     mysqlConnection.query(sql, data, (err,  results) => {
//         if (err) throw err;
//         res.send(JSON.stringify({
//             "status": 200,
//             "error": null,
//             "response": results
//         }));
//     });
// });


// POST Sensor Data
router.post('/pilot', async function(req, res) {
  try {

    const { nodo, humedad } = req.body;
    const sqlQuery = 'INSERT INTO pilots (nodo, humedad) VALUES (?,?)';
    const result = await pool.query(sqlQuery, [nodo, humedad]);
    res.status(200).json({ userId: result.insertId });

  } catch (error) {
    res.status(400).send(error.message);
    
  }
});



// GET All data from Sensor Humidity
// router.get('/pilot', (req, res) => {
//     mysqlConnection.query('SELECT * FROM pilots', (err, rows, fields) => {
//       if(!err) {
//         res.json(rows);
//       } else {
//         console.log(err);
//       }
//     });  
//   });

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
  
  module.exports = router;