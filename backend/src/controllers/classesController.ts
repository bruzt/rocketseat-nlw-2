import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface IScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

interface IIndexFilters {
    week_day: number;
    subject: string;
    time: string;
}

export default {

    index: async (req: Request, res: Response) => {

        const filters: IIndexFilters = req.query as any;

        if(!filters.week_day || !filters.subject || !filters.time) {
            return res.status(400).json({ message: 'missing one or more filters to search classes' });
        }

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
    },

    store: async (req: Request, res: Response) => {

        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
        
        const trx = await db.transaction();
    
        try {
        
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
        
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id: insertedUsersIds[0]
            });
        
            const classSchedule = schedule.map( (scheduleItem: IScheduleItem) => {
                return {
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                    class_id: insertedClassesIds[0]
                }
            });
        
            await trx('class_schedule').insert(classSchedule)
        
            await trx.commit();
        
            return res.sendStatus(201);
    
        } catch (error) {
    
            trx.rollback();
    
            console.error(error);
            return res.status(400).json({ message: 'Unexpected error while creating new class' });
        }
    }
}