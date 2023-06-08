import mongoose from 'mongoose'
import config from './config'
import app from './app'
import { errorLogger, logger } from './shared/logger'

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`🙂 Database connected successfully`)

    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error(`😞 Failed to connect database`, err)
  }
}

boostrap()
