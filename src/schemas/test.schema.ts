import Joi from "joi";

export const baseTestSchema = Joi.object({
    id_test: Joi.number().required(),
    test_name: Joi.string().required(),
    test_questions: Joi.number().required(),
})

export const deleteTestSchema = Joi.object({
    id_test: Joi.number().required(),
})