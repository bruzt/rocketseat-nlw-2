import dotenv from 'dotenv';

let env: string;
if(process.env.NODE_ENV === 'test') env = '.env.test';
else if(process.env.NODE_ENV === 'prod') env = '.env';
else env = '.env.dev';

dotenv.config({
    path: env
});

/////////////////////////

import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', String(process.env.DB_FILENAME))
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true
}