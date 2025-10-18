import { before, describe, it, after } from "mocha";
import request from "supertest";
import { expect } from 'chai';
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import app from "../Machine/app";
import { shutdown, startServer } from "../server";

before(async () => {
    await startServer();
});

describe('ROOT', (): void => {
    it(ReasonPhrases.OK, async () => {
        const res = await request(app).get('/');
        expect(res.status).to.equal(StatusCodes.OK);
    });
});

describe('API_ROOT', (): void => {
    it(ReasonPhrases.OK, async () => {
        const res = await request(app).get('/api/');
        expect(res.status).to.equal(StatusCodes.OK);
    });
});

after(async () => {
    await shutdown();
});