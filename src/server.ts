import apiRoute from './routes/apiRoute';
import app from './Machine/app';
import { connectDB, dbClose } from './Machine/dbConn';
import NOT_FOUND from './Config/NOT_FOUND';
import { CloseListning, startListning } from './Machine/Trigger';

export async function startServer() {
    const { conn } = await connectDB();     //trigger database conn
    app.use('/api', apiRoute(conn));        //mount api route
    app.use(NOT_FOUND);      //mount NOT_FOUND
    if (require.main === module) { startListning(); }       //start server
    process.on('SIGINT', shutdown); process.on('SIGTERM', shutdown);
}

export async function shutdown() {
    await dbClose();        //close dbcon
    CloseListning();        //stop server
}

if (require.main === module) {
    startServer().catch(err => { console.error('Error while starting server:', err); process.exit(1) });       //trigger machine
}