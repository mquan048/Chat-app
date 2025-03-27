import db from '../configs/db.js';
import { v4 as uuidv4 } from 'uuid';

export const getFirst = async (chatId) => {
  const query =
    'SELECT * FROM messages WHERE chatId = ? ORDER BY createAt DESC LIMIT 20';
  const messages = await db.execute(query, [chatId]);
  return messages[0];
};

export const getNext = async (chatId, offset) => {
  const query = `SELECT * FROM messages WHERE chatId = ? ORDER BY createAt DESC LIMIT 20 OFFSET ${offset}`;
  const messages = await db.execute(query, [chatId]);
  return messages[0];
};

export const create = async (message, senderId, chatId) => {
  const id = uuidv4();
  const query =
    'INSERT INTO messages (id, message, senderId, chatId) VALUES (?, ?, ?, ?)';
  const result = await db.execute(query, [id, message, senderId, chatId]);
  return result[0].insertId;
};
