const mongoose = require('mongoose');
require('dotenv').config()


const uri = process.env.TEST_MONGO_URL;

if (!uri) {
  throw new Error('TEST_MONGO_URL is not set');
}

if (!uri.includes('test')) {
  throw new Error('Refusing to run tests against non-test database');
}

module.exports.connect = async () => {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(uri, {
    maxPoolSize: 5,
  });

  await mongoose.connection.syncIndexes();
};

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

module.exports.disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
};
