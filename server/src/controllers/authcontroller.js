import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../lib/db.js';

const JWT_SECRET = "super_secret_key";

export const register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Campos obligatorios faltantes" });
    }
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, email, password, address)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, address`,
      [name, email, hashedPassword, address]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      user,
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};