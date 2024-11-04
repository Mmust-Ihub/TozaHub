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
    // mail
    GMAIL_USER: joi.string().required().description("default gmail username"),
    GMAIL_PASSWORD: joi.string().required().description("default gmail password "),
    // auth service
    AUTH_USERNAME: joi.string().required().description("auth username"),
    AUTH_PASSWORD: joi.string().required().description("auth password"),
    AUTH_URL: joi.string().required().description("auth url"),
    VEHICLE_URL: joi.string().required().description("vehicle url"),
    // intasend
    INTA_PUBLISHABLE_KEY: joi.string().required().description("Intasend publishable key"),
    INTA_SECRET_TOKEN: joi.string().required().description("Intasend secret token"),
    INTA_TEST_ENV: joi.string().required().description("Intasend test environment"),
    INTA_WALLET_URL: joi.string().required().description("Intasend wallet url"),
    DEFAULT_WALLET: joi.string().required().description("Intasend central wallet"),
    // bullmq
    REDIS_URL: joi.string().required().description("Redis url"),
    WALLET_QUEUE: joi.string().required().description("bullmq wallet queue"),
    EMAIL_QUEUE: joi.string().required().description("bullmq email queue"),
    SENSOR_QUEUE: joi.string().required().description("bullmq sensor queue"),
    TRANS_QUEUE: joi.string().required().description("bullmq transaction queue")
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
  mail: {
    user: envVars.GMAIL_USER,
    pass: envVars.GMAIL_PASSWORD
  },
  mongoose: {
    url: envVars.MONGODB_URL,
    name: envVars.MONGODB_NAME,
  },
  auth: {
    username: envVars.AUTH_USERNAME,
    password: envVars.AUTH_PASSWORD,
    auth_url: envVars.AUTH_URL,
    vehicl_url: envVars.VEHICLE_URL
  },
  intasend: {
    key: envVars.INTA_PUBLISHABLE_KEY,
    secret: envVars.INTA_SECRET_TOKEN,
    env: envVars.INTA_TEST_ENV,
    wallet_url: envVars.INTA_WALLET_URL,
    default_wallet: envVars.DEFAULT_WALLET
  },
  bullmq: {
    redis_url: envVars.REDIS_URL,
    wallet_queue: envVars.WALLET_QUEUE,
    email_queue: envVars.EMAIL_QUEUE,
    sensor_queue: envVars.SENSOR_QUEUE,
    trans_queue: envVars.TRANS_QUEUE
  }
};
