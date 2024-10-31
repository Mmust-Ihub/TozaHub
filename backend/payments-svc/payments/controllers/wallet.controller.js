import { catchAsync } from "../utils/catchAsync.js";
import { ApiError } from "../utils/APiError.js";
import { topUpSchema, walletSchema } from "../helpers/schemaValidation.js";
import { getAllWallets, getTopUpHistory, getWalletData, topUp } from "../services/wallet.service.js";
import { walletQueue } from "../jobs/queues/queue.js";
import { removeConfig } from "../config/bullmq.js";

const createWallet = catchAsync(async (req, res) => {
  const result = walletSchema.validate(req.body);
  if (result?.error) {
    const error = result.error.details[0].message;
    throw new ApiError(400, error);
  }
  const job = await walletQueue.add("create a wallet", req.body, removeConfig);
  return res.status(202).json({
    status: "success",
    message: `job with id: ${job.id} received for processing`,
  });
});

const getWallets = catchAsync(async (req, res) => {
  const wallets = await getAllWallets();
  return res.status(200).json(wallets);
});

const getWallet = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "email is required");
  const wallet = await getWalletData(email);
  return res.status(200).json(wallet);
});

const topUpWallet = catchAsync(async (req, res) => {
  const result = topUpSchema.validate(req.body);
  if (result?.error) {
    const error = result.error.details[0].message;
    throw new ApiError(400, error);
  }
  await topUp(req.body)
  return res.status(202).json({
    status: "success",
    message: `Your request have been received for processing`,
  });
});

const topUpHistory = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "email is required");
  const resp = await getTopUpHistory(email)
  return res.status(200).json(resp)
});

export default { createWallet, getWallets, getWallet, topUpHistory, topUpWallet };
