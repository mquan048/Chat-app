import * as db from '../configs/db.js';
import { v4 as uuidv4 } from 'uuid';

export const getAll = async (userId) => {
  const query = `
    SELECT lstm.chatId AS chatId, u.id AS userId, u.name AS name, m.message AS lastMessage
      FROM messages m 
      JOIN (
        SELECT c.id AS chatId, MAX(m.createAt) AS createAt
	        FROM chats c 
	        JOIN messages m ON m.chatId = c.id
	        WHERE $1 IN (c.userId1, c.userId2)
	        GROUP BY c.id 
        ) AS lstm
        ON m.chatId = lstm.chatId AND m.createAt = lstm.createAt
      JOIN chats c
        ON c.id = m.chatId
      JOIN users u
        ON u.id IN (c.userId1, c.userId2)
      WHERE NOT u.id = $1
  `;
  const chats = await db.query(query, [userId]);
  return chats.rows;
};

export const create = async (userId1, userId2) => {
  const id = uuidv4();
  const query = 'INSERT INTO chats (id, userId1, userId2) VALUES ($1, $2, $3)';
  const result = await db.query(query, [
    id,
    Math.min(userId1, userId2),
    Math.max(userId1, userId2),
  ]);
  return result;
};

export const checkUserInChat = async (chatId, userId) => {
  const query =
    'SELECT * FROM chats WHERE id = $1 AND $2 IN (userId1, userId2)';
  const result = await db.query(query, [chatId, userId]);
  return result.rows[0];
};
