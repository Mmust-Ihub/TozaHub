import { catchAsync } from "../utils/catchAsync.js";
import config from "../config/config.js";
import { ApiError } from "../utils/APiError.js";
import { getSummary, saccoTransactions, sensorLogs } from "../services/sacco.service.js";

const accountSummary = catchAsync(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "sacco email is required ...");
  }
  const summary = await getSummary(email);
  return res.status(200).json(summary);
});

const getTransactions = catchAsync(async (req, res) => {
  const { email } = req.body;
  const response = await saccoTransactions(email);
  return res.status(200).json(response)
});

const getSensorLogs = catchAsync(async(req, res) => {
  const {email} = req.body
  const result = await sensorLogs(email)
  return res.status(200).json(result)
})

export default { accountSummary, getTransactions, getSensorLogs};
