import config from "./config.js";

export const redisConnection = {
  host: config.bullmq.redis_host,
  port: config.bullmq.redis_port,
};
export const removeConfig = {
  removeOnComplete: {
    age: 3600,
  },
  removeOnFail: {
    age: 24 * 3600,
  },
};
