import 'dotenv/config';
import express from 'express';
import 'express-async-errors';

import { routes } from './src/routes';
import { handleErrors } from './src/middlewares/handleErrors';

import 'reflect-metadata';
import './src/database';

const app = express();

app.use(express.json());
app.use(routes);
app.use(handleErrors);

app.listen(3333, () => console.log('Valoriza is Online'));