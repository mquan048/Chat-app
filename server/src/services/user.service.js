import db from '../configs/db.js';

export const getById = async (id) => {
  const users = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  return users[0][0];
};

export const getAll = async () => {
  const users = await db.execute('SELECT * FROM users');
  return users[0];
};

export const getByEmail = async (email) => {
  const users = await db.execute('SELECT * FROM users WHERE email = ?', [
    email,
  ]);
  return users[0][0];
};

export const create = async (user) => {
  const result = await db.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [user.name, user.email, user.password]
  );
  return result[0].insertId;
};
