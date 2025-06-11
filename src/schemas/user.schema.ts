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

export const createStudentSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().allow(null, '').optional(),
    surname: Joi.string().allow(null, '').optional(),
    school: Joi.string().allow(null, '').optional(),
    created_by: Joi.number().required(),
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

export const authenticateUserSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})