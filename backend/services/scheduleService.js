const { Queue } = require('bullmq');
const { getTokenCreationDate, generateTimestamps } = require('./utils');
const connection = { connection: { host: 'localhost', port: 6379 } };

const fetchQueue = new Queue('fetch-prices', connection);

async function scheduleJob(token, network) {
  const creation = await getTokenCreationDate(token, network);
  const timestamps = generateTimestamps(creation);
  for (const ts of timestamps) {
    await fetchQueue.add('fetch-price', { token, network, timestamp: ts });
  }
}

module.exports = { scheduleJob };
