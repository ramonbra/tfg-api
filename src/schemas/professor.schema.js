import Joi from 'joi';

export const createProfessorSchema = Joi.object({
    id_professor: Joi.number().integer().positive().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().optional(),
    surname: Joi.string().optional(),
    school: Joi.string().optional(),
    admin: Joi.boolean().required(),
});

export const updateProfessorSchema = Joi.object({
    id_professor: Joi.number().integer().positive().required(),
    username: Joi.string().optional(),
    password: Joi.string().optional(),
    name: Joi.string().optional(),
    surname: Joi.string().optional(),
    school: Joi.string().optional(),
    admin: Joi.boolean().optional(),
});
