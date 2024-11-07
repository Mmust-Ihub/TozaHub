import { failedTransactions, getSaccosSummary, getSummary } from "../services/agent.service.js";
import { catchAsync } from "../utils/catchAsync.js";

const summary = catchAsync(async (req, res) => {
  const response = await getSummary();
  return res.status(200).json(response);
});

const saccosSummary = catchAsync(async(req, res) => {
  const resp = await getSaccosSummary()
  return res.status(200).json(resp)
})

export const saccoFailedTransactions = catchAsync(async(req, res) => {
    const resp = await failedTransactions(req.body)
    return res.status(200).json(resp)
})

export default { summary, saccosSummary, saccoFailedTransactions};
