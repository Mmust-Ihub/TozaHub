import joi from "joi"

export const walletSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    phone_number: joi.number().min(10).required(),
  })

export const topUpSchema = joi.object({
  email: joi.string().email().required(),
  phone_number: joi.number().min(10).required(),
  amount: joi.number().required()
})