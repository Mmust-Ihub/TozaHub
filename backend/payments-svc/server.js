import { connectToMongoDB, disconnectFromMongoDB } from "./payments/helpers/mongodb.js";
import app from "./payments/app.js";
import config from "./payments/config/config.js";
import logger from "./payments/config/logger.js";

// workers
import createWalletWorker from "./payments/jobs/workers/walletWorker.js";


let server = app.listen(config.port, () => {
  connectToMongoDB()
  logger.info(`app is running on http://localhost:${config.port}`)
})

const exitHandler = () => {
  if (server){
    server.close()
    logger.info("server closed ...")
    process.exit(1)
  }else{
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);


process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  disconnectFromMongoDB()
  if (server) {
    server.close();
  }
});
