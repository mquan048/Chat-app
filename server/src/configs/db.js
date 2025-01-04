import sql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  database: process.env.DB_DATABASE || 'chat-app',
};

const pool = sql.createConnection(config);

export const testConnection = async () => {
  pool
    .promise()
    .ping()
    .then(() => console.log('Connected to MySQL'))
    .catch((err) => console.error('Error connecting to MySQL:', err));
};

export default pool.promise();
