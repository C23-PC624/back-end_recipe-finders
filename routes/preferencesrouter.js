const express = require('express')
const preferencesrouter = express.Router()
const Multer = require('multer')
const imgUpload = require('../modules/imgUpload')
const connection = require('../db');

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
})

// Router for /history endpoint

// Router for /preferences endpoint
preferencesrouter.get("/preferences", (req, res) => {
    const query = "SELECT * FROM preferences";
    connection.query(query, (err, rows, field) => {
        if(err) {
            res.status(500).send({message: err.sqlMessage});
        } else {
            res.json(rows);
        }
    });
});



// Router for /preferences/:id endpoint
preferencesrouter.get("/preferences/:id", (req, res) => {
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

preferencesrouter.post('/preferences', (req, res) => {
    const { name } = req.body;
  
    const query = 'INSERT INTO preferences (name) VALUES (?)';
    connection.query(query, [name], (err, result) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage });
      } else {
        res.status(201).send({ message: 'Data inserted successfully', insertId: result.insertId });
      }
    });
  });



// Router for /preferences/:id endpoint
preferencesrouter.delete("/preferences/:id", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM preferences WHERE id = ?";
    connection.query(query, [id], (err, rows, field) => {
        if (err) {
            res.status(500).send({message: err.sqlMessage});
        } else {
            res.send({message: "Delete successful"});
        }
    });
});

module.exports = preferencesrouter
