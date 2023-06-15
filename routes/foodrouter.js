const express = require('express')
const foodrouter = express.Router()
const Multer = require('multer')
const imgUpload = require('../modules/imgUpload')
const connection = require('../db');
const { verifyToken } = require('./authMiddleware');

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
})

// Router for /food endpoint
foodrouter.get("/food", verifyToken, (req, res) => {
    const query = "SELECT food.*, preferences.name AS kategori FROM food JOIN preferences ON food.category = preferences.id";
    connection.query(query, (err, rows, field) => {
        if(err) {
            res.status(500).send({message: err.sqlMessage});
        } else {
            res.json(rows);
        }
    });
});
// foodrouter for /food/:id endpoint
foodrouter.get("/food/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    const query = "SELECT food.*, preferences.name AS kategori FROM food JOIN preferences ON food.category = preferences.id WHERE id = ?";
    connection.query(query, [id], (err, rows, field) => {
        if(err) {
            res.status(500).send({message: err.sqlMessage});
        } else {
            res.json(rows);
        }
    });
});
// foodrouter for /food/:id endpoint
foodrouter.delete("/food/:id", (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM food WHERE id = ?";
    connection.query(query, [id], (err, rows, field) => {
        if (err) {
            res.status(500).send({message: err.sqlMessage});
        } else {
            res.send({message: "Delete successful"});
        }
    });
});

foodrouter.post('/food', multer.single('img'), imgUpload.uploadToGcs, (req, res) => {
  const { name, category, description, ingredients, kkal, lemak, protein, karbohidrat, idx } = req.body;
  const imageUrl = req.file ? req.file.cloudStoragePublicUrl : '';
  const query = 'INSERT INTO food (name, category, description, ingredients, kkal, lemak, protein, karbohidrat, img, idx) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(query, [name, category, description, ingredients, kkal, lemak, protein, karbohidrat, imageUrl, idx], (err, result) => {
    if (err) {
      res.status(500).send({ message: err.sqlMessage });
    } else {
      res.status(201).send({ message: 'Food inserted successfully', insertId: result.insertId });
    }
  });
});

  foodrouter.put('/food/:id', multer.single('img'), imgUpload.uploadToGcs, (req, res) => {
    const id = req.params.id;
    const { name, category, description, ingredients } = req.body;
    let imageUrl = '';
  
    if (req.file && req.file.cloudStoragePublicUrl) {
      imageUrl = req.file.cloudStoragePublicUrl;
    }
  
    const query = 'UPDATE food SET name = ?, category = ?, description = ?,ingredients = ?, img = ? WHERE id = ?';
    connection.query(query, [name, category, description, ingredients, imageUrl, id], (err, result) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).send({ message: 'Food not found' });
        } else {
          res.status(200).send({ message: 'Food updated successfully' });
        }
      }
    });
  });


    // foodrouter for searching food by idx collumn
foodrouter.post("/findfood", verifyToken, (req, res) => {
  const idx = req.body.predicted_class;

  const query = "SELECT * FROM food WHERE idx = ?";
  connection.query(query, [idx], (err, rows, field) => {
      if(err) {
          res.status(500).send({message: err.sqlMessage});
      } else {
          res.json(rows);
      }
  });
});


module.exports = foodrouter