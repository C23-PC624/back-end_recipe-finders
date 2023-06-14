const express = require('express')
const usersrouter = express.Router()
const Multer = require('multer')
const imgUpload = require('../modules/imgUpload')
const connection = require('../db');
const jwt = require('jsonwebtoken');
const verifyToken = require('./authMiddleware').verifyToken;
const bcrypt = require('bcrypt');



const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
})

usersrouter.get("/users", verifyToken, (req, res) => {
    const query = "SELECT * FROM users";
    connection.query(query, (err, rows, field) => {
        if(err) {
            res.status(500).send({message: err.sqlMessage});
        } else {
            res.json(rows);
        }
    });
});
// usersrouter for /users/:id endpoint
usersrouter.get("/users/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    const query = "SELECT users.id, users.name, users.username, users.password, users.img, preferences.name AS preference_name FROM users JOIN preferences ON users.preferences = preferences.id WHERE users.id = ?";
    connection.query(query, [id], (err, rows, field) => {
        if(err) {
            res.status(500).send({message: err.sqlMessage});
        } else {
            res.json(rows);
        }
    });
});
// usersrouter for /users/:id endpoint
usersrouter.delete("/users/:id",verifyToken, (req, res) => {
    const id = req.params.id;

    const query = "DELETE FROM users WHERE id = ?";
    connection.query(query, [id], (err, rows, field) => {
        if (err) {
            res.status(500).send({message: err.sqlMessage});
        } else {
            res.send({message: "Delete successful"});
        }
    });
});


usersrouter.post('/users/register', multer.single('img'), imgUpload.uploadToGcs, (req, res) => {
  const { name, username, password } = req.body;
  const imageUrl = req.file ? req.file.cloudStoragePublicUrl : '';

  // Mengenkripsi password menggunakan bcrypt
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).send({ message: 'Password encryption failed' });
    } else {
      const query = 'INSERT INTO users (name, username, password, img) VALUES (?, ?, ?, ?)';
      connection.query(query, [name, username, hashedPassword, imageUrl], (err, result) => {
        if (err) {
          res.status(500).send({ message: err.sqlMessage });
        } else {
          res.status(201).send({ message: 'User inserted successfully', insertId: result.insertId });
        }
      });
    }
  });
});




// Login User
usersrouter.post("/users/login", (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], (err, rows) => {
    if (err) {
      res.status(500).send({ message: err.sqlMessage });
    } else {
      if (rows.length === 0) {
        res.status(404).send({ message: 'User not found' });
      } else {
        const user = rows[0];
        // Membandingkan password yang diberikan dengan password yang di-hash
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.status(500).send({ message: 'Password comparison failed' });
          } else if (result) {
            const token = jwt.sign({ id: user.id }, 'secret_key');
            res.status(200).send({ message: 'Login Successful', data: user, token: token });
          } else {
            res.status(401).send({ message: 'Invalid password' });
          }
        });
      }
    }
  });
});







usersrouter.put('/editpass/:id', verifyToken, (req, res) => {
  const id = req.params.id;
  const { oldpassword, password } = req.body;

  // Mengambil password saat ini dari database
  const getPasswordQuery = 'SELECT password FROM users WHERE id = ?';

  connection.query(getPasswordQuery, [id], (err, result) => {
    if (err) {
      res.status(500).send({ message: err.sqlMessage });
    } else {
      if (result.length === 0) {
        res.status(404).send({ message: 'User not found' });
      } else {
        const currentPassword = result[0].password;

        // Membandingkan old password yang diberikan dengan password saat ini
        bcrypt.compare(oldpassword, currentPassword, (err, isMatch) => {
          if (err) {
            res.status(500).send({ message: 'Error comparing passwords' });
          } else if (!isMatch) {
            res.status(401).send({ message: 'Old password is incorrect' });
          } else {
            // Mengenkripsi password baru menggunakan bcrypt
            bcrypt.hash(password, 10, (err, hashedPassword) => {
              if (err) {
                res.status(500).send({ message: 'Password encryption failed' });
              } else {
                const updatePasswordQuery = 'UPDATE users SET password = ? WHERE id = ?';
                connection.query(updatePasswordQuery, [hashedPassword, id], (err, result) => {
                  if (err) {
                    res.status(500).send({ message: err.sqlMessage });
                  } else {
                    if (result.affectedRows === 0) {
                      res.status(404).send({ message: 'User not found' });
                    } else {
                      res.status(200).send({ message: 'Password updated successfully' });
                    }
                  }
                });
              }
            });
          }
        });
      }
    }
  });
});




  usersrouter.put('/editimage/:id', multer.single('img'), imgUpload.uploadToGcs, verifyToken, (req, res) => {
    const id = req.params.id;
    
    let imageUrl = '';
    if (req.file && req.file.cloudStoragePublicUrl) {
      imageUrl = req.file.cloudStoragePublicUrl;
    }
    const query = 'UPDATE users SET img = ? WHERE id = ?';
    connection.query(query, [ imageUrl, id], (err, result) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).send({ message: 'Users not found' });
        } else {
          res.status(200).send({ message: 'Users updated successfully' });
        }
      }
    });
  });



  usersrouter.put('/users/:id', multer.single('img'), imgUpload.uploadToGcs, verifyToken,(req, res) => {
    const id = req.params.id;
    const { username, preferences } = req.body;
    let imageUrl = '';
  
    if (req.file && req.file.cloudStoragePublicUrl) {
      imageUrl = req.file.cloudStoragePublicUrl;
    }
  
    const query = 'UPDATE users SET username = ?, preferences = ?, img = ? WHERE id = ?';
    connection.query(query, [username, preferences, imageUrl, id], (err, result) => {
      if (err) {
        res.status(500).send({ message: err.sqlMessage });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).send({ message: 'Users not found' });
        } else {
          res.status(200).send({ message: 'Users updated successfully' });
        }
      }
    });
  });




  

  
  


module.exports=usersrouter