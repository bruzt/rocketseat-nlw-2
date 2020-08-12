import superstest from 'supertest';
import { promisify } from 'util';
import { exec } from 'child_process';
const execAsync = promisify(exec);

import app from '../../../app';
import db from '../../../database/connection';
import generateFakeUser from '../../../testUtils/generateFakeUser';

describe('Connections Controller Store test suit', () => {

    beforeEach( async () => {

        await execAsync('npm run test:migrate:rollback');
        await execAsync('npm run test:migrate:latest');
    });

    it('should add a connection', async () => {

        const { user } = generateFakeUser();

        const insertedUser = await db('users').insert(user);
        //await db('connections').insert({ user_id: insertedUser[0] });

        const response = await superstest(app).post('/connections')
            .send({ user_id: insertedUser[0] })
        ;
        
        expect(response.status).toBe(201);
    });
});