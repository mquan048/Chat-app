import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE || 'chat-app',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = async (sql, params) => {
  const client = await pool.connect();
  const result = await client.query(sql, params);
  client.release();
  return result;
};

export const testConnection = async () => {
  const client = await pool.connect();
  try {
    console.log('Connected to PostgresSql');
  } catch (err) {
    console.error('Error connecting to PostgresSql: ', err);
  } finally {
    client.release();
  }
};

// const config = {
//   user: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || '',
//   host: process.env.DB_HOST || 'localhost',
//   port: parseInt(process.env.DB_PORT) || 3306,
//   database: process.env.DB_DATABASE || 'chat-app',
// };

// // const pool = sql.createConnection(config);

// // export const testConnection = async () => {
// //   pool
// //     .promise()
// //     .ping()
// //     .then(() => console.log('Connected to MySQL'))
// //     .catch((err) => console.error('Error connecting to MySQL:', err));
// // };

// export default pool.promise();
