import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { errorLogger, logger } from './shared/logger';
import { Server } from 'http';

// uncaught exceptions

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`🙂 Database connected successfully`);

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error(`😞 Failed to connect database`, err);
  }

  // server off
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

boostrap();

// Singnal terminate

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
