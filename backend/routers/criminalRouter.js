import express from 'express';
import pool from '../database/db.js';

const router = express.Router();

//Fetch every criminal in the database
router.get('/fetchAll', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT
                c.criminal_id,
                c.first_name,
                c.last_name,
                c.date_of_birth,
                EXTRACT(YEAR FROM age(CURRENT_DATE, c.date_of_birth)) AS age,
                c.sex,
                c.gender,
                c.pronouns,
                c.pob_city,
                c.pob_state_province,
                c.country_of_citizenship,
                c.date_processed,
                c.last_updated,

                p.phone_number,
                p.left_eye_color,
                p.right_eye_color,
                p.hair_color,
                p.height_feet,
                p.height_inches,
                p.weight_lbs,
                p.address_street,
                p.address_city,
                p.address_state_province,
                p.address_postal_code,
                p.address_country,
                p.tattoos,
                p.distinguishing_marks

            FROM criminals c
            LEFT JOIN criminal_profiles p ON c.criminal_id = p.criminal_id
            ORDER BY c.last_name, c.first_name
        `);
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching criminals:', err);
        res.status(500).json({error: 'Internal server error'});
    }
});

//Fetch Criminal SSN
router.get('/:id/ssn', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            `SELECT ssn FROM criminal_ssn WHERE criminal_id = $1`,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'SSN not found' });
        }

        const maskedSSN = rows[0].ssn.replace(/^(\d{3})-(\d{2})/, 'XXX-XX');

        res.status(200).json({ ssn: maskedSSN });
    } catch (err) {
        console.error('Error fetching SSN: ', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Fetch licenses for one criminal
router.get('/:id/licenses', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            `SELECT 
                license_id,
                license_type,
                license_number,
                license_class,
                state_issued,
                country_issued,
                expiration_date,
                status
            FROM licenses
            WHERE criminal_id = $1`,
            [id]
        );
        res.json(rows);
    } catch (err) {
        console.error(`Error fetching licenses for id: ${id}`, err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;