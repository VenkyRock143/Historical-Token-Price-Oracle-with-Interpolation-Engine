const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Redis = require('ioredis');
const cors = require('cors');
const priceRoutes = require('./routes/price');
const scheduleRoutes = require('./routes/schedule');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const redis = new Redis(process.env.REDIS_URL);
app.set('redis', redis);

app.use('/price', priceRoutes);
app.use('/schedule', scheduleRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
