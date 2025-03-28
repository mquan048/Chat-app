import * as db from '../configs/db.js';
import { v4 as uuidv4 } from 'uuid';

export const getById = async (id) => {
  const users = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return users.rows[0];
};

export const getAll = async () => {
  const users = await db.query('SELECT * FROM users');
  return users.rows;
};

export const getByEmail = async (email) => {
  const users = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return users.rows[0];
};

export const create = async (user) => {
  const id = uuidv4();
  const query =
    'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)';
  const result = await db.query(query, [
    id,
    user.name,
    user.email,
    user.password,
  ]);
  return result;
};
