import { transactionModel } from "../models/transactions.model.js";
import { ApiError } from "../utils/APiError.js";

const getGroupingId = (interval) => {
  switch (interval) {
    case "daily":
      return {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
        day: { $dayOfMonth: "$createdAt" },
      };
    case "weekly":
      return {
        year: { $year: "$createdAt" },
        week: { $week: "$createdAt" },
      };
    case "monthly":
      return {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
      };

    case "yearly":
      return {
        year: { $year: "$createdAt" },
      };
    default:
      throw new ApiError(400, "invalid interval");
  }
};
// export const getSummary = async(body) => {
//   const { interval, start_date, end_date } = body;
//   const startDate = new Date(start_date);
//   const endDate = new Date(end_date);
//   const pipeline = [
//     // { $match: {status: "success"} }
//     { $match: {createdAt: {$gte: startDate, $lte: endDate}} }
//   ];
//   const results = await transactionModel.aggregate(pipeline)
//   return results
// };

export const getSummary = async(body) => {
  const { interval, start_date, end_date } = body;
  console.log(interval)
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);
  const pipeline = [
    { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
    {
      $group: {
        _id: getGroupingId(interval),
        total_transactions: { $count: {} },
        successful_transactions: {
          $sum: { $cond: [{ $eq: ["$status", "success"] }, 1, 0] },
        },
        total_amount_collected: {
          $sum: { $cond: [{ $eq: ["$status", "success"] }, "$amount", 0] },
        },
      },
    },
    {$sort: {_id:1}}
  ];
  const results = await transactionModel.aggregate(pipeline)
  return results
};
