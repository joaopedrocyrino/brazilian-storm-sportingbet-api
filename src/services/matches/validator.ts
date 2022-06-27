import Joi from 'joi'

export const resultsValidator = Joi.object({
    season: Joi.number().required(),
    house: Joi.string().required(),
    visitor: Joi.string().required()
})
