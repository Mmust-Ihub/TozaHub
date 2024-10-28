
import { connectToMongoDB } from "./payments/helpers/mongodb.js";
connectToMongoDB()
import createWalletWorker from "./payments/jobs/workers/walletWorker.js";