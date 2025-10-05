import { Router } from "express";
import { Db } from "mongodb";
import { ApiController } from "../Controller/ApiController";
import MulterClass from "../Config/MulterClass";

export default function apiRoute(conn: Db): Router {
    const router: Router = Router();
    const c1: ApiController = new ApiController(conn);
    const multer: MulterClass = new MulterClass();

    // define routes and their methods
    router.get('/', c1.apiRoot.bind(c1));       //this will leades to all method for perform operations with db
    router.post('/upload', multer.upload.single('file'), (req, res) => c1.uploadFile(req, res));        //for upload files

    return router;
}