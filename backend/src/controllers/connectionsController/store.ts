import { Request, Response } from 'express';

import db from '../../database/connection';

export default async (req: Request, res: Response) => {

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
