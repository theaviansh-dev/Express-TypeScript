import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const NOT_FOUND = (req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).json({ status: StatusCodes.NOT_FOUND, message: ReasonPhrases.NOT_FOUND });
};

export default NOT_FOUND;