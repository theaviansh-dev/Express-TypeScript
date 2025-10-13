import { Request, Response } from "express";
import { Db } from "mongodb";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

export class ApiController {
    constructor(private db: Db) { }

    public apiRoot(req: Request, res: Response): void {
        res.status(200).json({ status: 200, message: "express + typescript is onn!" });
    }

    public uploadFile(req: Request, res: Response): void {
        if (!req.file) {
            res.status(400).json({ status: 400, message: "No file uploaded" });
            return;
        }
        res.status(200).json({status: 200,message: "File uploaded successfully",file: req.file});
    }
}