const { pool } = require('../lib/db');

const getContainers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM containers');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  getContainers,
};