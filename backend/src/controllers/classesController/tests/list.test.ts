import superstest from 'supertest';
import { promisify } from 'util';
import { exec } from 'child_process';
const execAsync = promisify(exec);

import app from '../../../app';
import db from '../../../database/connection';
import generateFakeUser from '../../../testUtils/generateFakeUser';
import convertHourToMinutes from '../../../utils/convertHourToMinutes';

describe('Classes Controller List test suit', () => {

    beforeEach( async () => {

        await execAsync('npm run test:migrate:rollback');
        await execAsync('npm run test:migrate:latest');
    });

    it('should return a filtered teacher', async () => {

        const { user, classInfo, schedule } = generateFakeUser({
            subject: 'Química',
            schedule: {
                week_day: 1,
                from: convertHourToMinutes('08:00'),
                to: convertHourToMinutes('10:00')
            }
        });

        const insertedUser = await db('users').insert(user);
        const insertedClass = await db('classes').insert({ ...classInfo, user_id: insertedUser[0] });
        await db('class_schedule').insert({ ...schedule[0], class_id: insertedClass[0] });

        const response = await superstest(app).get(`/classes?week_day=1&subject=Química&time=09:00`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

    it('should not return a teacher', async () => {

        const { user, classInfo, schedule } = generateFakeUser({
            subject: 'Química',
            schedule: {
                week_day: 1,
                from: convertHourToMinutes('08:00'),
                to: convertHourToMinutes('10:00')
            }
        });

        const insertedUser = await db('users').insert(user);

        const insertedClass = await db('classes').insert({ ...classInfo, user_id: insertedUser[0] });

        await db('class_schedule').insert({ ...schedule[0], class_id: insertedClass[0] });

        const response = await superstest(app).get(`/classes?week_day=1&subject=Física&time=09:00`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
    });

    it('should return code 400 for missig filters', async () => {

        const response = await superstest(app).get(`/classes`);
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('missing one or more filters to search classes');
    });
});