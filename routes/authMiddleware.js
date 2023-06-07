const express = require('express')
const usersrouter = express.Router()
const Multer = require('multer')
const imgUpload = require('../modules/imgUpload')
const connection = require('../db');
const jwt = require('jsonwebtoken');


// Verify Token untuk autentikasi setelah melakukan login
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send({ message: 'You are not logged in' });
  }
  jwt.verify(token, 'secret_key', (err, decoded) => { 
    if (err) {
        return res.status(500).send({ message: 'Failed to authenticate token' })
    }
    req.userId = decoded.id // Menyimpan ID pengguna yang terotentikasi dalam objek permintaan (request)
    next()
  })
  }

  module.exports = 
  {
    verifyToken
  };