import Joi from 'joi';

export const createProfessorSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().allow(null, '').optional(),
    surname: Joi.string().allow(null, '').optional(),
    school: Joi.string().allow(null, '').optional(),
});

export const updateProfessorSchema = Joi.object({
    id_professor: Joi.number().required(),
    username: Joi.string().optional(),
    password: Joi.string().allow(null, '').optional(),
    name: Joi.string().allow(null, '').optional(),
    surname: Joi.string().allow(null, '').optional(),
    school: Joi.string().allow(null, '').optional(),
});

export const deleteProfessorSchema = Joi.object({
    id_professor: Joi.number().required()
});