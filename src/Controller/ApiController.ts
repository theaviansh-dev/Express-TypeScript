import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Db } from "mongodb";

export class ApiController {
    constructor(private db: Db) { }

    public async apiRoot(req: Request, res: Response): Promise<void> {
        const collectionList_Prosess = await this.db.listCollections().toArray().catch((err) => { return err.message });
        res.status(StatusCodes.OK).json(collectionList_Prosess);
    }

    public uploadFile(req: Request, res: Response): void {
        if (!req.file) {
            res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: "No file uploaded" });
            return;
        }
        res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: "File uploaded successfully", file: req.file });
    }
}