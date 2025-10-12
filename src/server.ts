import express from "express";
import 'dotenv/config';
import { Db, MongoClient } from "mongodb";
import apiRoute from "./routes/apiRoute";
import { exit } from "process";
import CORS from "./Config/CORS";
import { RootRoute } from "./Config/RootRoute";

//check for db credientials
const tempM: string | undefined = process.env.MONGOD_URL ?? undefined;
const DB_NAME: string | undefined = process.env.DB_NAME ?? undefined;
if (!tempM) { console.log("MongoDB Credential are missing"); exit(1); }
const MONGOD_URL: string = tempM;
if (!DB_NAME) { console.log("MongoD Credential are missing"); exit(1); }

//enviroment
const app = express();
app.use(CORS());        //cors middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let dbClient: MongoClient;
let server: ReturnType<typeof app.listen>;

async function startServer() {
    try {
        //create conn
        dbClient = new MongoClient(MONGOD_URL as string);
        await dbClient.connect();
        const conn: Db = dbClient.db(DB_NAME);
        app.get('/', RootRoute);        //root route
        app.use('/api', apiRoute(conn));        //api route mount

        const port: number = Number(process.env.SERVER_PORT) || 8000;       //servse start
        server = app.listen(port, () => { console.log(`Server is running on port ${port}`); });

        process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);        //shut down srver
    } catch (err) { console.error('Error while starting server:', err instanceof Error ? err.message : err); process.exit(1); }
}

async function shutdown() {     //suttng down server
    console.log('\nshutting down...');
    try {
        await dbClient.close().then(() => console.log("MongoDB connection closed."));       //close the conn
    } catch (err) { console.error("Error closing MongoDB connection:", err); }
    server?.close(() => { console.log("HTTP server closed."); process.exit(0); });      //check for conn
    setTimeout(() => { console.error("Forcefully shutting down..."); process.exit(1); }, 5000);
}

startServer().catch((err) => console.error(err));       //start server