import { failedTransactions, getSummary } from "../services/agent.service.js";
import { catchAsync } from "../utils/catchAsync.js";

const summary = catchAsync(async (req, res) => {
  const response = await getSummary(req.body);
  console.log(response);
  return res.status(200).json(response);
});

export const saccoFailedTransactions = catchAsync(async(req, res) => {
    const resp = await failedTransactions(req.body)
    return res.status(200).json(resp)
})

export default { summary, saccoFailedTransactions };
