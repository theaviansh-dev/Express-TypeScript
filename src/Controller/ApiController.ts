import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Db } from "mongodb";

export class ApiController {
    constructor(private db: Db) { }

    public apiRoot(req: Request, res: Response): void {
        res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: ReasonPhrases.OK + ' Evarything works fine' });
    }

    public uploadFile(req: Request, res: Response): void {
        if (!req.file) {
            res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: "No file uploaded" });
            return;
        }
        res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: "File uploaded successfully", file: req.file });
    }
}