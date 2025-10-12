import cors, { CorsOptions } from 'cors';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
const isProductionEnv = String(process.env.ISPRODUCTION_ENV).toLowerCase() === 'true';

const parseAllowedOrigins = (): string[] | '*' => {
    const setting = process.env.CORS_ALLOWED ?? '*';
    if (setting === 'false') return [];
    if (setting === '*') return '*';
    try {
        return JSON.parse(setting.replace(/'/g, '"'));
    } catch (e) { if (!isProductionEnv) { console.error('Failed to parse CORS_ALLOWED:', e); } return '*'; }
};

export default function useCORS() {
    const allowedOrigins = parseAllowedOrigins();
    if (allowedOrigins === '*') { if (!isProductionEnv) { console.log('CORS Allowed: *'); } return cors(); }
    if (Array.isArray(allowedOrigins) && allowedOrigins.length === 0) {
        if (!isProductionEnv) console.warn('CORS is disabled');
        return (req: Request, res: Response) => {
            return res.status(403).json({ error: 'CORS Error', message: 'CORS is disabled on this server', origin: req.headers.origin || null });
        };
    }

    const corsOptionsDelegate = (req: Request, callback: (err: Error | null, options?: CorsOptions) => void) => {
        const origin = req.headers.origin;
        if (isProductionEnv && typeof (origin) === 'undefined') { return callback(new Error('Origin is required in production')); }
        if (origin && allowedOrigins.includes(origin)) { return callback(null, { origin: true, credentials: true }); }
        if (origin && !allowedOrigins.includes(origin)) {
            if (!isProductionEnv) { console.warn('Blocked by CORS:', origin); } return callback(new Error('Not allowed by CORS'));
        }
        if (!origin && !isProductionEnv) { return callback(null, { origin: true, credentials: true }); }
        return callback(new Error('Not allowed by CORS'));
    };

    const corsMiddleware = cors(corsOptionsDelegate);
    return (req: Request, res: Response, next: NextFunction) => {
        corsMiddleware(req, res, (err: any) => {
            if (err && err.message === 'Not allowed by CORS') {
                return res.status(403).json({ error: 'CORS Error', message: `Origin is not allowed by CORS`, origin: req.headers.origin || null });
            }
            if (err && err.message === 'Origin is required in production') {
                return res.status(403).json({ error: 'CORS Error', message: `Origin is required in production.`, origin: req.headers.origin || null });
            }
            next();
        });
    };
}