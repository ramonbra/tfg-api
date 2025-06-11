import Joi from 'joi';

export const createQuestionSchema = Joi.object({
    question: Joi.string().required(),
    answers: Joi.string().required(),
    correctAnswers: Joi.string().required(),
    difficulty: Joi.string().required(),
    labels: Joi.string().required(),
    image: Joi.string().required(),
    created_by: Joi.number().required(),
});

export const updateQuestionSchema = Joi.object({
    id_question: Joi.number().required(),
    question: Joi.string().optional(),
    answers: Joi.string().optional(),
    correctAnswers: Joi.string().optional(),
    difficulty: Joi.string().optional(),
    labels: Joi.string().optional(),
    image: Joi.string().optional(),
});

export const deleteQuestionSchema = Joi.object({
    id_question: Joi.number().required()
});