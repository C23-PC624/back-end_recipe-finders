
const express = require('express')
const favoriterouter = express.Router()
const Multer = require('multer')
const imgUpload = require('../modules/imgUpload')
const connection = require('../db');

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
})


favoriterouter.get("/favorites", (req, res) => {
    const query = "SELECT * FROM favorites";
    connection.query(query, (err, rows, field) => {
        if(err) {
            res.status(500).send({message: err.sqlMessage});
        } else {
            res.json(rows);
        }
    });
});



// Router for /preferences/:id endpoint
favoriterouter.get("/preferences/:id", (req, res) => {
    const id = req.params.id;

    const query = "SELECT * FROM preferences WHERE id = ?";
    connection.query(query, [id], (err, rows, field) => {
        if(err) {
            res.status(500).send({message: err.sqlMessage});
        } else {
            res.json(rows);
        }
    });
});

favoriterouter.post('/favorites', (req, res) => {
    const { user_id,food_id } = req.body;
  
    const query = 'INSERT INTO favorites (user_id , food_id) VALUES (? ,?)';
    connection.query(query, [user_id,food_id], (err, result) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage });
      } else {
        res.status(201).send({ message: 'Data inserted successfully', insertId: result.insertId });
      }
    });
  });

  module.exports = favoriterouter