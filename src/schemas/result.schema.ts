import Joi from 'joi';

export const createResultSchema = Joi.object({
    id_student: Joi.number().required(), 
    id_test: Joi.number().required(), 
    correct_answers: Joi.number().required(), 
    wrong_answers: Joi.number().required(),
});