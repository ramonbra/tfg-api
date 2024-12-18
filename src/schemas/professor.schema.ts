import Joi from 'joi';

export const createProfessorSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().optional(),
    surname: Joi.string().optional(),
    school: Joi.string().optional(),
});

export const updateProfessorSchema = Joi.object({
    name: Joi.string().optional(),
    surname: Joi.string().optional(),
    school: Joi.string().optional(),
    password: Joi.string().optional(),
});
