import app from "./app"
import 'dotenv/config'
const port: number = Number(process.env.SERVER_PORT) || 8000;
let server: ReturnType<typeof app.listen> | null;

export const startListning = () => {
    server = app.listen(port, () => {
        console.log(`Port ${port} is Active!`);     //start server
    });
}

export const CloseListning = async () => {
    server?.close(() => { console.log(`Port ${port} is closed!`), server = null });        //stop server
    setTimeout(() => { server ? console.error('\nForced shutdown') : undefined; process.exit(1) }, 2000);
}