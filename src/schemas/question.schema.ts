import Joi from 'joi';

export const createQuestionSchema = Joi.object({
    question: Joi.string().required(),
    answers: Joi.string().required(),
    correction: Joi.string().required(),
    difficulty: Joi.string().required(),
});

export const updateQuestionSchema = Joi.object({
    id_question: Joi.number().required(),
    question: Joi.string().optional(),
    answers: Joi.string().optional(),
    correction: Joi.string().optional(),
    difficulty: Joi.string().optional(),
});

export const deleteQuestionSchema = Joi.object({
    id_question: Joi.number().required()
});