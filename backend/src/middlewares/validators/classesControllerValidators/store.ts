import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        whatsapp: Joi.string().required(),
        bio: Joi.string().required(),
        subject: Joi.string().required(),
        cost: Joi.number().required(),
        schedule: Joi.array().items(Joi.object().keys({
            week_day: Joi.number().required(),
            from: Joi.string().required(),
            to: Joi.string().required()
        })).min(1).required(),
    }),

}, {
    abortEarly: false
});