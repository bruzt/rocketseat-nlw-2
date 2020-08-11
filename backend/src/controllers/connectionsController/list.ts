import { Request, Response } from 'express';

import db from '../../database/connection';

export default async (req: Request, res: Response) => {

    try {

        const totalConnections = await db('connections').count('* as total');

        const { total } = totalConnections[0];

        return res.json({ total });
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Unexpected error while searching the connections'});
    }
}
