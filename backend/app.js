const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectToDB = require('./db/db'); // Assuming db.js is in the db folder
const app = express();

// Connect to MongoDB
connectToDB();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
}
);  

module.exports = app;