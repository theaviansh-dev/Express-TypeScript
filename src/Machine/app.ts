import express from 'express';
import morgan from 'morgan';
import CORS from '../Config/CORS';
import NonceHelmet from '../Config/HelmetConfig';
import { RootRoute } from '../Config/RootRoute';

const app = express();
app.use(morgan(':remote-addr :status :method :response-time ms- ":url"'));      //log request, :user-agent
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(NonceHelmet);       //mount NonceHelmet Middleware
app.use(CORS());        //mount cors Middleware
app.get('/', RootRoute);        //mount root route

export default app;