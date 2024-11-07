import { transactionModel } from "../models/transactions.model.js"
import { walletModel } from "../models/wallet.model.js"
import { remoteWalletData } from "./wallet.service.js"
import { sensorModel } from "../models/sensor.model.js"

export const getSummary = async(email) => {
    const { wallet_id } = await walletModel.findOne({ email: email });
    const pipeline = [
        {$match: {"status": "failed", "email": email}},
        {$group: {_id: null, totalUnpaid: {$sum: "$amount"}, pending: {$sum: 1}}},
        {$project: {
            _id: 0,
            totalUnpaid: 1,
            pending: 1
        }}
    ]
    const resp = await transactionModel.aggregate(pipeline)
    const {current_balance} = await remoteWalletData(wallet_id)
    return {current_balance, ...resp[0]}
}

export const saccoTransactions = async(email) => {
    const pipeline = [
        {$match: {email: email}},
        {$sort:{"createdAt": -1}},
        {$project:{
            _id:0,
            createdAt: 1,
            number_plate: 1,
            amount: 1,
            status: 1,
            narrative: 1
        }}
    ]
    const result = await transactionModel.aggregate(pipeline)
    return result
}

export const sensorLogs = async(email) => {
    const pipeline = [
        {$match: {email: email}},
        {$sort:{"createdAt": -1}},
        {$project:{
            _id:0,
            createdAt: 1,
            destination: 1,
            number_plate: 1,
        }}
    ]
    const result = await sensorModel.aggregate(pipeline)
    return result
}