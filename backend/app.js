const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectToDB = require('./db/db.js'); // Assuming db.js is in the db folder
const userRoutes = require('./routes/user.routes'); // Assuming user.routes.js is in the routes folder
const app = express();

// Connect to MongoDB
connectToDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
}
);  

app.use('/api/users', userRoutes); // Use user routes
module.exports = app;