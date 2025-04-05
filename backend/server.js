require('dotenv').config();  

const express = require('express');
const pool = require('./database/db');

//Connect to PostgreSQL
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log("DB User:", process.env.DB_USER);