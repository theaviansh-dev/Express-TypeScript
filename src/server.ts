import express from "express";
import 'dotenv/config';
import { Db, MongoClient } from "mongodb";
import { Request, Response } from "express";
import apiRoute from "./routes/apiRoute";
import { exit } from "process";

const tempM: string | undefined= process.env.MONGOD_URL;
const DB_NAME: string | undefined = process.env.DB_NAME;
if (!tempM) { console.log("MongoD URL is missing"); exit(1); }
const MONGOD_URL:string = tempM;

//enviroment
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let dbClient: MongoClient;
let server: ReturnType<typeof app.listen>;

async function startServer() {
    try {
        //create conn
        dbClient = new MongoClient(MONGOD_URL);
        await dbClient.connect();
        const conn: Db = dbClient.db(DB_NAME);

        //root route
        app.get('/', (req: Request, res: Response) => {
            res.status(200).json({ status: 200, message: 'server started' });
        });

        //api route mount
        app.use('/api', apiRoute(conn));

        //servse start
        const port = process.env.SERVER_PORT || 8000;
        server = app.listen(port, () => { console.log(`Server is running on port ${port}`); });

        //shut down srver
        process.on('SIGINT', shutdown);
        process.on('SIGTERM', shutdown);
    } catch (err) { console.error('Error while starting server:', err instanceof Error ? err.message : err); process.exit(1); }
}

//suttng down server
async function shutdown() {
    console.log('\nshutting down...');
    try {
        await dbClient.close().then(() => console.log("MongoDB connection closed."));
    } catch (err) { console.error("Error closing MongoDB connection:", err); }
    //check for conn
    server?.close(() => { console.log("HTTP server closed."); process.exit(0); });
    setTimeout(() => { console.error("Forcefully shutting down..."); process.exit(1); }, 5000);
}

//start server
startServer().catch((err) => console.error(err));