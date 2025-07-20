const Price = require('../models/price');
const { Alchemy, Network } = require('alchemy-sdk');
const settings = { apiKey: process.env.ALCHEMY_API_KEY, network: Network.ETH_MAINNET };
const alchemy = new Alchemy(settings);

function interpolatePrice(ts, before, after) {
  const ratio = (ts - before.timestamp) / (after.timestamp - before.timestamp);
  return before.price + ratio * (after.price - before.price);
}

async function getClosestPrices(token, network, ts) {
  const before = await Price.findOne({ token, network, timestamp: { $lt: ts } }).sort({ timestamp: -1 });
  const after = await Price.findOne({ token, network, timestamp: { $gt: ts } }).sort({ timestamp: 1 });
  return [before, after];
}

async function getTokenCreationDate(token, network) {
  const transfers = await alchemy.core.getAssetTransfers({
    fromBlock: '0x0',
    contractAddresses: [token],
    category: ['erc20'],
    order: 'asc',
    maxCount: '1'
  });
  const ts = new Date(transfers.transfers[0].metadata.blockTimestamp).getTime() / 1000;
  return ts;
}

function generateTimestamps(from) {
  const now = Math.floor(Date.now() / 1000);
  const ts = [];
  for (let t = from; t <= now; t += 86400) ts.push(t);
  return ts;
}

async function fetchAlchemyPrice(token, network, timestamp) {
  // Mock: replace with actual Alchemy API call
  return { price: Math.random(), timestamp };
}

module.exports = { interpolatePrice, getClosestPrices, getTokenCreationDate, generateTimestamps, fetchAlchemyPrice };
