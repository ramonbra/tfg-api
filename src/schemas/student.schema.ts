import Joi from 'joi';

export const createStudentSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().allow(null, '').optional(),
    surname: Joi.string().allow(null, '').optional(),
    school: Joi.string().allow(null, '').optional(),
});

export const updateStudentSchema = Joi.object({
    id_student: Joi.number().required(),
    username: Joi.string().optional(),
    password: Joi.string().allow(null, '').optional(),
    name: Joi.string().allow(null, '').optional(),
    surname: Joi.string().allow(null, '').optional(),
    school: Joi.string().allow(null, '').optional(),
});

export const deleteStudentSchema = Joi.object({
    id_student: Joi.number().required()
});