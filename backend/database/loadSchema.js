import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

async function loadSchema() {
    try {
      const sql = fs.readFileSync(__dirname + '/schema.sql', 'utf8');
      await pool.query(sql);
      console.log('Schema applied');
    } catch (err) {
      console.error('Failed to load schema:', err);
    } finally {
      await pool.end();
    }
}

loadSchema();