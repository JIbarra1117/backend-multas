import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('❌ Error:', err);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: err.message || '❌ Error interno del servidor'
    });
};
