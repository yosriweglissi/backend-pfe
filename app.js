const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const logger = require('morgan');
const apiRouter = require('./routes/api');
app.use(cors());

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', apiRouter);

module.exports = app;
