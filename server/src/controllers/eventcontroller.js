const { pool } = require('../lib/db');
const { v4: uuidv4 } = require('uuid');

const getEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEvent = async (req, res) => {
  const { title, date, location, description } = req.body;

  if (!title || !date || !location || !description) {
    return res.status(400).json({ error: 'Faltan campos' });
  }

  try {
    const id = uuidv4();
    const result = await pool.query(
      `INSERT INTO events (id, title, date, location, description, attendees)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id, title, date, location, description, 0]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getEvents, createEvent };