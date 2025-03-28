import * as db from '../configs/db.js';
import { v4 as uuidv4 } from 'uuid';

export const getFirst = async (chatId) => {
  const query =
    'SELECT * FROM messages WHERE chatId = $1 ORDER BY createAt DESC LIMIT 20';
  const messages = await db.query(query, [chatId]);
  return messages.rows;
};

export const getNext = async (chatId, offset) => {
  const query = `SELECT * FROM messages WHERE chatId = $1 ORDER BY createAt DESC LIMIT 20 OFFSET ${offset}`;
  const messages = await db.query(query, [chatId]);
  return messages.rows;
};

export const create = async (message, senderId, chatId) => {
  const id = uuidv4();
  const query =
    'INSERT INTO messages (id, message, senderId, chatId) VALUES ($1, $2, $3, $4)';
  const result = await db.query(query, [id, message, senderId, chatId]);
  return result;
};
