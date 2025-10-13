import { Request, Response } from "express";
import crypto from 'crypto';

const CookieCons = (req: Request, res: Response): string => {
    let key: string | undefined = req.get('cookie');
    if (typeof (key) === 'undefined') {
        key = crypto.randomUUID() as string;
        res.setHeader('Set-Cookie', 'X-Request-Token' + '=' + key);
        return key as string;
    }
    const r: string[] = key.split('=');
    return r[1] as string;
}

export function RootRoute(req: Request, res: Response): void {
    const key: string = CookieCons(req, res) as string;
    res.status(200).json({
        title: 'Ex-Script',
        description: 'This is am sample repository build in express.js and typescript specifically for backend servers with minimal dependencies. Please check for package.json for more information.',
        owner: 'Avinash',
        author: 'github.com/theaviansh-dev',
        git: 'github.com/theaviansh-dev/Express-TypeScript',
        'X-Request-Token': key
    });
}