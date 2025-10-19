import app from "./app"
import 'dotenv/config'
import { Server_Port } from "./ENV";
let server: ReturnType<typeof app.listen> | null;

export const startListning = () => {
    server = app.listen(Server_Port, () => {
        console.log(`Port ${Server_Port} is Active!`);     //start server
    });
}

export const CloseListning = async () => {
    server?.close(() => { console.log(`Port ${Server_Port} is closed!`), server = null });        //stop server
    setTimeout(() => { server ? console.error('\nForced shutdown') : undefined; process.exit(1) }, 2000);
}