import { Request, Response } from "express";
import { Db } from "mongodb";

export class ApiController {
    constructor(private db: Db) { }

    public apiRoot(req: Request, res: Response): void {
        res.status(200).json({ status: 200, message: "express + typescript is onn!" });
    }
}