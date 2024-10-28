import { Worker } from "bullmq";
import config from "../../config/config.js";
import { redisConnection } from "../../config/bullmq.js";
import logger from "../../config/logger.js";
import { createNewWallet } from "../../services/wallet.service.js";


const createWalletWorker = new Worker(config.bullmq.wallet_queue, async(job) => {
    // await createNewWallet(job.data)
    console.log(`Received the job`)
    await new Promise(resolve => setTimeout(resolve, 8000))

}, {
  connection: redisConnection,
});

createWalletWorker.on("active", (job) => {
    logger.info(`[${job.id}] wallet creation  worker started`)
});

createWalletWorker.on("completed", async (job) => {
    logger.info(`[${job.id}] wallet creation completed successfully`)
});

createWalletWorker.on("failed", (job, err) => {
  console.log(`[${job.id}] wallet creation failed with error: ${err}`);
});

export default createWalletWorker