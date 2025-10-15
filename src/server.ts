import express from "express";
import 'dotenv/config';
import morgan from "morgan";
import { Db, MongoClient } from "mongodb";
import apiRoute from "./routes/apiRoute";
import { exit } from "process";
import CORS from "./Config/CORS";
import { RootRoute } from "./Config/RootRoute";
import NonceHelmet from "./Config/HelmetConfig";
import ErrorHandler from "./Config/ErrorHandeler";

//check for db credientials
const tempM: string | undefined = process.env.MONGOD_URL ?? undefined;
const DB_NAME: string | undefined = process.env.DB_NAME ?? undefined;
if (!tempM) { console.log("MongoDB Credential are missing"); exit(1); }
const MONGOD_URL: string = tempM as string;
if (!DB_NAME) { console.log("MongoD Credential are missing"); exit(1); }

//enviroment
const app = express();
app.use(morgan(':remote-addr :status :method :response-time ms- ":url"'));        //:user-agent
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let dbClient: MongoClient;
let server: ReturnType<typeof app.listen>;

async function startServer() {
    try {
        dbClient = new MongoClient(MONGOD_URL as string);       //create conn
        await dbClient.connect();
        const conn: Db = dbClient.db(DB_NAME);
        app.use(NonceHelmet);       //mount NonceHelmet Middleware
        app.use(CORS());        //mount cors Middleware
        app.get('/', RootRoute);        //mount root route
        app.use('/api', apiRoute(conn));        //mount api route
        app.use(ErrorHandler);      //mount ErrorHandler
        const port: number = Number(process.env.SERVER_PORT) || 8000;       //server start
        server = app.listen(port, () => { console.log(`Port ${port} is Active!`); });
        process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);        //shutdown server
    } catch (err) { console.error('Error while starting server:', err instanceof Error ? err.message : err); process.exit(1); }
}

async function shutdown() {     //sutting down server
    console.log('\nshutting down...');
    try { await dbClient.close().then(() => console.log("MongoDB connection closed."));       //close the conn
    } catch (err) { console.error("Error closing MongoDB connection:", err); }
    server?.close(() => { console.log("HTTP server closed."); process.exit(0); });      //check for conn
    setTimeout(() => { console.error("Forcefully shutting down..."); process.exit(1); }, 5000);
}

startServer().catch((err) => console.error(err));       //trigger server