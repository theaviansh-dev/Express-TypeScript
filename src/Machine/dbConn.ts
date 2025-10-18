import 'dotenv/config';
import { MongoClient, Db } from 'mongodb';
const { MONGOD_URL, DB_NAME } = process.env;        //import credentials
if (!MONGOD_URL || !DB_NAME) { throw new Error('MONGOD_URL or DB_NAME is missing'); }

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

async function dbClose(){
    await dbClient?.close().then(() => { console.log('\nMongoDB connection closed') }).catch((err) => console.log(err));
}

export { connectDB, dbClose };     //export dbcon details