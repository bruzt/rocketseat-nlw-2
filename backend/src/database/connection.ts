import Knex from 'knex';
import path from 'path';

const db = Knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, String(process.env.DB_FILENAME))
    },
    useNullAsDefault: true
});

export default db;
