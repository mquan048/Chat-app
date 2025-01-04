import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './configs/db.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

testConnection();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
});
