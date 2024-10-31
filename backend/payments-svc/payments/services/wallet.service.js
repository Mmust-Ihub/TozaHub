import IntaSend from "intasend-node";
import axios from "axios";
import { ApiError } from "../utils/APiError.js";
import { walletModel } from "../models/wallet.model.js";
import config from "../config/config.js";
import { allowList, blockList } from "../utils/utils.js";

export const intasend = new IntaSend(
  config.intasend.key,
  config.intasend.secret,
  config.intasend.env
);

let wallets = intasend.wallets();

export const createNewWallet = async (saccoData) => {
  const existWallet = await walletModel.findOne({ email: saccoData.email });
  if (existWallet) {
    throw new ApiError(400, "The sacco already has a wallet");
  }
  let resp = await wallets.create({
    label: saccoData.name,
    wallet_type: "WORKING",
    currency: "KES",
    can_disburse: true,
  });
  resp = blockList(resp,["available_balance", "current_balance"])
  const response = await walletModel.create({ ...resp, ...saccoData });
  return response;
};

export const getAllWallets = async () => {
  let resp = await wallets.list();
  return await resp.results;
};

export const getWalletData = async (saccoEmail) => {
  let wallet = await walletModel.findOne({ email: saccoEmail }).lean();
  if (wallet){
    wallet = allowList(wallet, ["name", "email", "phone_number", "wallet_id", "label"])
    const {available_balance, current_balance} = await remoteWalletData(wallet.wallet_id)
    return { ...wallet, available_balance, current_balance}
  }
  return {}
};

export const topUp = async(data) => {
  const {wallet_id} = await walletModel.findOne({email: data.email})
  let resp = await wallets.fundMPesa({...data, host: data.email,api_ref: 'MPESA Top-Up', wallet_id})
  return resp
}

export const getTopUpHistory = async(saccoEMail) => {
  const {wallet_id} = await walletModel.findOne({email: saccoEMail})
  const resp = await wallets.transactions(wallet_id)
  let {count, results} = resp
  if (count > 0){
    results = results.filter((item) => {
      return item.trans_type === "CHARGE" || item.trans_type === "SALE"
    })
  }
  return {count, results}
}

export const transferMoney = async(from, to, amount, narrative="Tax") => {
  const resp = await wallets.intraTransfer(from, to, amount, narrative)
  return resp
}

export const remoteWalletData = async (wallet_id) => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${config.intasend.secret}`,
  };
  const url = `${config.intasend.wallet_url}/${wallet_id}/`;
  const resp = await axios.get(url, { headers });
  return await resp.data;
};