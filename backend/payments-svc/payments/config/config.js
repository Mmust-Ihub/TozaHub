import { config } from "dotenv";
import path, { dirname } from "path";
import joi from "joi";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi
      .string()
      .valid("production", "development", "testing")
      .required(),
    PORT: joi.number().default(3000),
    BASE_URL: joi.string().required().description("Application base url "),
    MONGODB_URL: joi.string().required().description("Mongodb url"),
    MONGODB_NAME: joi.string().required().description("Mongodb name"),
    INTA_PUBLISHABLE_KEY: joi.string().required().description("Intasend publishable key"),
    INTA_SECRET_TOKEN: joi.string().required().description("Intasend secret token"),
    INTA_TEST_ENV: joi.string().required().description("Intasend test environment"),
    INTA_WALLET_URL: joi.string().required().description("Intasend wallet url"),
    REDIS_HOST: joi.string().required().description("Redis host"),
    REDIS_PORT: joi.string().required().description("Redis port "),
    WALLET_QUEUE: joi.string().required().description("bullmq wallet queue"),
    EMAIL_QUEUE: joi.string().required().description("bullmq email queue")
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  base_url: envVars.BASE_URL,
  mongoose: {
    url: envVars.MONGODB_URL,
    name: envVars.MONGODB_NAME,
  },
  intasend: {
    key: envVars.INTA_PUBLISHABLE_KEY,
    secret: envVars.INTA_SECRET_TOKEN,
    env: envVars.INTA_TEST_ENV,
    wallet_url: envVars.INTA_WALLET_URL
  },
  bullmq: {
    redis_host: envVars.REDIS_HOST,
    redis_port: envVars.REDIS_PORT,
    wallet_queue: envVars.WALLET_QUEUE,
    email_queue: envVars.EMAIL_QUEUE
  }
};
