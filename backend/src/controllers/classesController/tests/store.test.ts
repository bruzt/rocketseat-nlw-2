import superstest from 'supertest';
import { promisify } from 'util';
import { exec } from 'child_process';
const execAsync = promisify(exec);

import app from '../../../app';
//import db from '../../../database/connection';
import generateFakeUser from '../../../testUtils/generateFakeUser';

describe('Classes Controller Store test suit', () => {

    beforeEach( async () => {

        await execAsync('npm run test:migrate:rollback');
        await execAsync('npm run test:migrate:latest');
    });

    it('should add a user, class and schedule to DB', async () => {

        const { user, classInfo, schedule } = generateFakeUser();

        const response = await superstest(app).post('/classes')
            .send({
                ...user,
                ...classInfo,
                schedule
            })
        ;

        expect(response.status).toBe(201);
    })
});