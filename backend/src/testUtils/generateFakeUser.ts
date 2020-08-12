import faker from 'faker';

interface IGenerateFakeUser {
    name?: string;
    avatar?: string;
    whatsapp?: string;
    bio?: string;
    subject?: string;
    cost?: number;
    schedule?: {
        week_day?: number;
        from?: number;
        to?: number;
    }
}

export default function generateFakeUser({
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule
}: IGenerateFakeUser = {}){
    
    return {
        user: {
            name: name || faker.name.findName(),
            avatar: avatar || faker.image.imageUrl(),
            whatsapp: whatsapp || faker.phone.phoneNumber(),
            bio: bio || faker.name.jobDescriptor(),
        },

        classInfo: {
            subject: subject || faker.name.jobArea(),
            cost: cost || faker.commerce.price(),
        },

        schedule: [{
            week_day: (schedule && schedule.week_day) ? schedule.week_day : faker.random.number(6),
            from: (schedule && schedule.from) ? schedule.from : `${faker.random.number(23)}:${faker.random.number(58)}`,
            to: (schedule && schedule.to) ? schedule.to : '23:59',
        }]
    }
} 
