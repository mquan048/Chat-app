import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './configs/db.js';
import { initRoutes } from './routes/index.js';
import { socketServer } from './configs/socket.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

testConnection();
initRoutes(app);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('Server is running on port: ', PORT);
});

socketServer(server);
