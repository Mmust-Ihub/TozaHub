import { Worker } from "bullmq";
import config from "../../config/config.js";
import { redisConnection } from "../../config/bullmq.js";
import logger from "../../config/logger.js";
import { createNewWallet } from "../../services/wallet.service.js";

const walletWorker = new Worker(config.bullmq.wallet_queue, async(job) => {
    await createNewWallet(job.data)
}, {
  connection: redisConnection,
});

walletWorker.on("active", (job) => {
    logger.info(`[${job.id}] wallet creation  worker started`)
});

walletWorker.on("completed", async (job) => {
    logger.info(`[${job.id}] wallet creation completed successfully`)
});

walletWorker.on("failed", (job, err) => {
  logger.error(`[${job.id}] wallet creation failed with error: ${err}`);
});

export default walletWorker;