import config from "./config.js";

export const redisConnection = {
  url: config.bullmq.redis_url,
};


export const removeConfig = {
  removeOnComplete: {
    age: 3600,
  },
  removeOnFail: {
    age: 24 * 3600,
  },
};
