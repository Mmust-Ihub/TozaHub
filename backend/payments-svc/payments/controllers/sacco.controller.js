import { catchAsync } from "../utils/catchAsync.js";
import config from "../config/config.js";
import { ApiError } from "../utils/APiError.js";
import { walletModel } from "../models/wallet.model.js";
import { remoteWalletData } from "../services/wallet.service.js";

const accountBalance = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "sacco email is required ...");
  }
  const { wallet_id } = await walletModel.findOne({ email: email });
  const { current_balance } = await remoteWalletData(wallet_id);
  return res.status(200).json({ current_balance });
});

const topUpAccount = catchAsync(async (req, res) => {
});

export default { accountBalance };
