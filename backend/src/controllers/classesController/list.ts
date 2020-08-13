import { Request, Response } from 'express';

import db from '../../database/connection';
import convertHourToMinutes from '../../utils/convertHourToMinutes';

interface IIndexFilters {
    week_day: number;
    subject: string;
    time: string;
}

export default async (req: Request, res: Response) => {

    const filters: IIndexFilters = req.query as any;

    const timeToMinutes = convertHourToMinutes(filters.time);

    try {

        const classes = 
            await db('classes')
                .whereExists( function() {
                    this.select('class_schedule.*')
                        .from('class_schedule')
                        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                        .whereRaw('`class_schedule`.`week_day` = ??', [Number(filters.week_day)])
                        .whereRaw('`class_schedule`.`from` <= ??', [timeToMinutes])
                        .whereRaw('`class_schedule`.`to` > ??', [timeToMinutes])
                })
                .where('classes.subject', '=', filters.subject)
                .join('users', 'classes.user_id', '=', 'users.id')
                .select(['classes.*', 'users.*']);

        return res.json(classes);

    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Unexpected error while searching classes' });
    }
}