import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { routes } from './src/routes';

import 'reflect-metadata';
import './src/database';

const app = express();

app.use(express.json());
app.use(routes);
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
	if(err instanceof Error){
		return response.status(400).json({error: err.message});
	}
	return response.status(500).json({ message: "An error has occurred. Please try again later." });
});

app.listen(3333, () => console.log('Valoriza is Online'));