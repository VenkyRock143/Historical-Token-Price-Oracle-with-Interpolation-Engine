const { interpolatePrice } = require('../services/utils');

test('interpolates correctly between prices', () => {
  const before = { timestamp: 1000, price: 10 };
  const after = { timestamp: 2000, price: 20 };
  const result = interpolatePrice(1500, before, after);
  expect(result).toBe(15);
});
