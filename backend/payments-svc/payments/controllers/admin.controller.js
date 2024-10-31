import { catchAsync } from "../utils/catchAsync.js";
import config from "../config/config.js";
import { summarySchema, withdrawSchema } from "../helpers/schemaValidation.js";
import { ApiError } from "../utils/APiError.js";
import { getSummary, withdraw } from "../services/admin.service.js";
import { remoteWalletData } from "../services/wallet.service.js";

const adminSummary = catchAsync(async(req, res) => {
    const result = summarySchema.validate(req.query)
    if (result?.error) {
        const error = result.error.details[0].message;
        throw new ApiError(400, error);
      }
    const summary = await getSummary(req.query)
    return res.status(200).json(summary)
})

const  accountBalance = catchAsync(async(req, res) => {
  const wallet_id = config.intasend.default_wallet
  const {current_balance} = await remoteWalletData(wallet_id)
  return res.status(200).json({current_balance})
})

const withdrawBalance = catchAsync(async(req, res) => {
  const result = withdrawSchema.validate(req.body)
  if (result?.error) {
      const error = result.error.details[0].message;
      throw new ApiError(400, error);
    }
  req.body.wallet_id = config.intasend.default_wallet
  const resp = await withdraw(req.body)
  return res.status(200).json(resp)
})

export default { adminSummary, accountBalance, withdrawBalance }