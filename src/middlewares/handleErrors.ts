import { Request, Response, NextFunction } from 'express';

export function handleErrors(err: Error, request: Request, response: Response, next: NextFunction) {
	if(err instanceof Error){
		return response.status(400).json({error: err.message});
	}
	return response.status(500).json({ message: 'An error has occurred. Please try again later.' });
}