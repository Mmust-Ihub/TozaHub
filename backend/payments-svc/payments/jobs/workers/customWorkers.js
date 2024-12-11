import { tryCatch, Worker } from "bullmq";
import mongoose from "mongoose";
import config from "../../config/config.js";
import { redisConnection } from "../../config/bullmq.js";
import logger from "../../config/logger.js";

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const topUpWorker = new Worker(
  config.bullmq.topup_queue,
  async (job) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      console.dir(job);
      for (let i = 0; i < job.data.times; i++) {
        console.log(`Waiting ${i} seconds`);
        await sleep(i * 1000);
      }
      throw new Error("This was intentional ...")
    } catch (error) {
      // Rollback all changes made to the database
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  },
  {
    connection: redisConnection,
  }
);

topUpWorker.on("active", async (job) => {
  logger.info(`[${job.id}] topup worker started `);
});

topUpWorker.on("completed", async (job) => {
  logger.info(`[${job.id}] topup and updating completed successfully.`);
});

topUpWorker.on("failed", (job, err) => {
  logger.error(`[${job.id}] topup and updating failed with error: ${err}`);
});

export default { topUpWorker };
