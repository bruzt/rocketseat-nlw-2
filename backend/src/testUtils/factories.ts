import factory from 'factory-girl';
//const { factory } = require('factory-girl');
import faker from 'faker';

import db from '../database/connection';

factory.define('users', db('users'), {
    name: faker.name.findName(),
    avatar: faker.image.avatar(),
    whatsapp: faker.phone.phoneNumber(),
    bio: faker.name.jobDescriptor(),
});

export default factory;
