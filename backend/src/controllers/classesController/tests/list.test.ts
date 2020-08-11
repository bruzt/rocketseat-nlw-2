//import superstest from 'supertest';

import factories from '../../../testUtils/factories';

describe('Classes Controller List test suit', () => {

    it('shoud show filtered teachers of db', async () => {

        const teacher = await factories.create('users');

        console.log(teacher);

        expect(4+4).toBe(8);
    });
});