import { Request, Response } from 'express';

import db from '../../database/connection';
import convertHourToMinutes from '../../utils/convertHourToMinutes';

interface IScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default async (req: Request, res: Response) => {

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