import 'dotenv/config';  

import express from 'express';
import cors from 'cors';
import pool from './database/db.js';

import criminalRouter from './routers/criminalRouter.js';

//Connect to PostgreSQL
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ 
  origin: 'http://localhost:3000',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));
app.use(express.json());

//Checking database connection
pool
  .connect()
  .then(() => console.log('Connected to Postgres'))
  .catch(err => console.error('Postgres connection error:', err));

// Routes
app.use('/api/criminals', criminalRouter);


//Starting server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});