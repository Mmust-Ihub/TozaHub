import { transactionModel } from "../models/transactions.model.js";
import { blockList} from "../utils/utils.js";

export const getSummary = async (body) => {
  const { start_date, end_date } = body;
  let dateFilter = {};
  if (start_date && end_date) {
    dateFilter = {
      transaction_date: {
        $gte: new Date(start_date),
        $lte: new Date(end_date),
      },
    };
  }

  const pipeline = [
    // Step 1: Filter by status 'unpaid' and date range
    {
      $match: {
        status: "failed",
        ...dateFilter,
      },
    },
    // Step 2: Group by sacco_id and calculate unpaid amount per SACCO
    {
      $group: {
        _id: "$name",
        totalUnpaidAmount: { $sum: "$amount" }, // Summing up unpaid amounts per SACCO
      },
    },
    // Step 3: Group all SACCOs and calculate total unpaid and count
    {
      $group: {
        _id: null,
        totalUnpaidAmount: { $sum: "$totalUnpaidAmount" }, // Total unpaid amount across all SACCOs
        numberOfSACCOsWithUnpaidDues: { $sum: 1 }, // Counting SACCOs with unpaid dues
      },
    },
    // Step 4: Project final output format
    {
      $project: {
        _id: 0,
        totalUnpaidAmount: 1,
        numberOfSACCOsWithUnpaidDues: 1,
      },
    },
  ];

  const result = await transactionModel.aggregate(pipeline)
  return result
};

export const failedTransactions = async(data) => {
    const pipeline = [
        {$match: {email: data.email, status: "failed"}},
        {$sort: {createdAt: -1}}
    ]
    let result = await transactionModel.aggregate(pipeline)
    let response = []
    result.forEach((data) => {
        response.push(blockList(data, ["_id", "name", "email"]))
    })
    return response
}

