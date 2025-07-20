const express = require('express');
const router = express.Router();
const { getPrice } = require('../services/priceService');

router.get('/', async (req, res) => {
  try {
    const { token, network, timestamp } = req.body;
    const redis = req.app.get('redis');
    const data = await getPrice(token, network, timestamp, redis);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
