import { Request, Response, request } from 'express';

import db from '../database/connection';

export default {

    index: async (req: Request, res: Response) => {

        try {

            const totalConnections = await db('connections').count('* as total');

            const { total } = totalConnections[0];

            return res.json({ total });
            
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: 'Unexpected error while searching the connections'});
        }
    },

    store: async (req: Request, res: Response) => {

        const { user_id } = req.body;

        try {

            await db('connections').insert({
                user_id
            });

            return res.sendStatus(201);
            
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: 'Unexpected error while storing the connection'});
        }
    }
}