const mongoose = require('mongoose')
const { mongoUrl } = require('./server/utils/config');

const app = require('./app');

const logger = require('./server/utils/logger');
const config = require('./server/utils/config');

mongoose.connect(mongoUrl).then( _ => {
  logger.info('successful connection')
}).catch(err => {
  logger.error('error connecting to db', err.message);
})
app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`)
  })