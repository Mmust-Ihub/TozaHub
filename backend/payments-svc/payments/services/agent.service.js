import { transactionModel } from "../models/transactions.model.js";
import { blockList } from "../utils/utils.js";

export const getSummary = async () => {
  const pipeline = [
    {
      $match: {
        status: "failed",
      },
    },
    {
      $group: {
        _id: "$name",
        totalUnpaidAmount: { $sum: "$amount" },
        pending: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: null,
        totalUnpaidAmount: { $sum: "$totalUnpaidAmount" },
        saccosWithUnpaidDues: { $sum: 1 },
        pending: { $sum: "$pending" },
      },
    },
    {
      $project: {
        _id: 0,
        totalUnpaidAmount: 1,
        saccosWithUnpaidDues: 1,
        pending: 1,
      },
    },
  ];
  return await transactionModel.aggregate(pipeline);
};

export const getSaccosSummary = async () => {
  const pipeline = [
    { $match: { status: "failed" } },
    { $group: { _id: "$name", pending: { $sum: "$amount" }, email: {$first: "$email"} } },
    {
      $project: {
        _id: 0,
        name: "$_id",
        email: 1,
        pending: 1,
      },
    },
  ];
  return  await transactionModel.aggregate(pipeline);
};

export const failedTransactions = async (data) => {
  const pipeline = [
    { $match: { email: data.email, status: "failed" } },
    { $sort: { createdAt: -1 } },
  ];
  let result = await transactionModel.aggregate(pipeline);
  let response = [];
  result.forEach((data) => {
    response.push(blockList(data, ["_id", "name", "email"]));
  });
  return response;
};
