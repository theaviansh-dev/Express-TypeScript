import 'dotenv/config';
const IsLocal_env: boolean = Boolean(process.env.ISPRODUCTION_ENV === 'false');
const Server_Port: number = Number(process.env.SERVER_PORT) || 8000;
export { IsLocal_env, Server_Port };