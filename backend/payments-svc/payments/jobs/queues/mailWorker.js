import { Worker } from "bullmq";
import config from "../../config/config.js";
import { redisConnection } from "../../config/bullmq.js";
import logger from "../../config/logger.js";
import { sendMail, topUpMail } from "../../utils/utils.js";

const mailWorker = new Worker(config.bullmq.email_queue, async(job) => {
      const {name, email} = job.data
      const payload = topUpMail(name, email)
      await sendMail(payload)
}, {
  connection: redisConnection,
});

mailWorker.on("active", (job) => {
    logger.info(`[${job.id}] mail worker started`)
});

mailWorker.on("completed", async (job) => {
    logger.info(`[${job.id}] mail sending completed successfully`)
});

mailWorker.on("failed", (job, err) => {
  logger.error(`[${job.id}] mail sending failed with error: ${err}`);
});

export default mailWorker;