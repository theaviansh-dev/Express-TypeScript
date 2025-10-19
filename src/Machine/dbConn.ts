import 'dotenv/config';
import { MongoClient, Db } from 'mongodb';
import { IsLocal_env } from './ENV';
import { exit } from 'process';
const { MONGOD_URL, DB_NAME } = process.env;        //import credentials

function CheckForUrl(): void {
    if (!MONGOD_URL || !DB_NAME) { throw new Error('MONGOD_URL or DB_NAME is missing'); }
    const regex = /^(mongodb(?:\+srv)?:\/\/)([a-zA-Z0-9._-]+(?::[a-zA-Z0-9._-]+)?@)?([a-zA-Z0-9.-]+)(?::\d{1,5})?(\/[a-zA-Z0-9._-]*)?(\?[a-zA-Z0-9&=._%-]+)?$/;
    const fallback = regex.test(MONGOD_URL as string);
    if (!fallback) { console.log("Invalid MongoDB URL: " + MONGOD_URL); exit(0); }
}
!IsLocal_env && CheckForUrl();      //check for Valid mongodb url

const dbClient = new MongoClient(MONGOD_URL as string);
let conn: Db | null = null;
let isConnected: boolean = false;
async function connectDB(): Promise<{ conn: Db; client: MongoClient }> {
    try {
        if (!isConnected) {
            await dbClient.connect();
            conn = dbClient.db(DB_NAME as string);
            isConnected = true;     //connected
        }
        if (!conn) throw new Error('Database connection failed');
        return { conn, client: dbClient };
    } catch (err) { throw 'MongoDB connection error' + err; }
}

async function dbClose() {
    await dbClient?.close().then(() => { console.log('\nMongoDB connection closed') }).catch((err) => console.log(err));
}

export { connectDB, dbClose };     //export dbcon details