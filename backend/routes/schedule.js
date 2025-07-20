const express = require('express');
const router = express.Router();
const { scheduleJob } = require('../services/scheduleService');

router.post('/', async (req, res) => {
  try {
    const { token, network } = req.body;
    await scheduleJob(token, network);
    res.status(200).send('Scheduled successfully.');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
