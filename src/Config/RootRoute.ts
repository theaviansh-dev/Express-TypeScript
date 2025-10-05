import { Request, Response } from "express";
export function RootRoute(req: Request, res: Response): void {
    res.status(200).json({
        title: 'Ex-Script',
        description: 'This is am sample repository build in express.js and typescript specifically for backend servers with minimal dependencies. Please check for package.json for more information.',
        owner: 'Avinash',
        author: 'github.com/theaviansh-dev',
        git: 'github.com/theaviansh-dev/Express-TypeScript'
    });
}