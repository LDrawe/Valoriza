import { Request, Response, NextFunction } from 'express';

export function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    
    const { admin = false } = request.headers;
    if (admin) {
        return next();
    }

    return response.status(401).json({
        error: 'You are not authorized to do this'
    });
}