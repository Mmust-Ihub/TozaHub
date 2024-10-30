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

export const summarySchema = joi.object({
  interval: joi.string().valid("daily", "weekly", "monthly", "yearly").required(),
  start_date: joi.string().required(),
  end_date: joi.string().required()
})