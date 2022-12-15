import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import { appDataSource } from './database';

appDataSource
  .initialize()
  .then(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(router);

    app.listen(3333, () => console.log('Server started'));
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
