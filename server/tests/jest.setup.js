jest.setTimeout(20000);

const mongo = require('./setupMongo');

beforeAll(async () => {
  await mongo.connect();
});

beforeEach(async () => {
  await mongo.clearDatabase();
});

afterAll(async () => {
  await mongo.disconnect();
});
