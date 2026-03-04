const { pool } = require('../lib/db');

const createPickup = async (req, res) => {
  try {
    const { materials, containerType, address, schedule } = req.body;

    if (!materials || materials.length === 0)
      return res.status(400).json({ message: 'Materiales requeridos' });

    if (!containerType)
      return res.status(400).json({ message: 'Tipo de envase requerido' });

    if (!address)
      return res.status(400).json({ message: 'Dirección requerida' });

    if (!schedule)
      return res.status(400).json({ message: 'Horario requerido' });

    const result = await pool.query(
      `INSERT INTO pickups (materials, container_type, address, schedule)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [materials, containerType, address, schedule]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

const getPickups = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM pickups ORDER BY created_at DESC'
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  createPickup,
  getPickups,
};