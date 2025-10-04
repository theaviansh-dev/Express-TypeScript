import { Router } from "express";
import { Db } from "mongodb";
import { ApiController } from "../Controller/ApiController";

export default function apiRoute(conn: Db): Router {
    const router: Router = Router();

    //create object of all controller
    const call_1 = new ApiController(conn);

    //define routes and their methods
    router.get('/', call_1.apiRoot.bind(call_1));

    //export wholesum
    return router;
}