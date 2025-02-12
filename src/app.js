// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const rateLimiterMiddleware = require('./middlewares/rateLimiter');
const { insertRecords } = require('./controllers/recordController');

const app = express();

app.use(bodyParser.json());
app.use(rateLimiterMiddleware); // Apply rate limiting globally

app.post('/insert-records', insertRecords); // Endpoint for inserting records

module.exports = app;
