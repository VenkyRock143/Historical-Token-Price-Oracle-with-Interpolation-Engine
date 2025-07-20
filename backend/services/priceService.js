const Price = require('../models/price');
const { interpolatePrice, getClosestPrices, fetchAlchemyPrice } = require('./utils');

async function getPrice(token, network, timestamp, redis) {
  const key = `${token}:${network}:${timestamp}`;
  const cached = await redis.get(key);
  if (cached) return { price: Number(cached), source: 'cache' };

  const exact = await Price.findOne({ token, network, timestamp });
  if (exact) {
    redis.set(key, exact.price, 'EX', 300);
    return { price: exact.price, source: 'alchemy' };
  }

  const [before, after] = await getClosestPrices(token, network, timestamp);
  if (!before || !after) throw new Error('Cannot interpolate price');
  const price = interpolatePrice(timestamp, before, after);
  redis.set(key, price, 'EX', 300);
  return { price, source: 'interpolated' };
}

module.exports = { getPrice };
