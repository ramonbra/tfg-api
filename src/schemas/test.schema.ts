import Joi from "joi";

export const baseTestSchema = Joi.object({
    id_test: Joi.number().required(),
    test_name: Joi.string().required(),
    difficulty: Joi.string().required(),
    test_questions: Joi.array().items(Joi.number()),
})

export const deleteTestSchema = Joi.object({
    id_test: Joi.number().required(),
})