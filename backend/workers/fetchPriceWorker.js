const { Worker } = require('bullmq');
const mongoose = require('mongoose');
const Price = require('../models/price');
const { fetchAlchemyPrice } = require('../services/utils');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const worker = new Worker('fetch-prices', async job => {
  const { token, network, timestamp } = job.data;
  const { price } = await fetchAlchemyPrice(token, network, timestamp);
  await Price.updateOne({ token, network, timestamp }, { price, source: 'alchemy' }, { upsert: true });
}, {
  connection: { host: 'localhost', port: 6379 }
});

worker.on('completed', job => console.log(`Completed job ${job.id}`));
worker.on('failed', (job, err) => console.error(`Failed job ${job.id}: ${err.message}`));
