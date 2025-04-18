import express from 'express';
import pool from '../database/db.js';

const router = express.Router();

//Fetch every criminal in the database
router.get('/fetchAll', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT
                criminal_id,
                first_name,
                last_name,
                date_of_birth,
                EXTRACT(YEAR FROM age(CURRENT_DATE, date_of_birth)) AS age,
                date_processed,
                last_updated
            FROM criminals
            ORDER BY last_name, first_name
        `);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching criminals:', err);
        res.status(500).json({error: 'Internal server error'});
    }
});

export default router;