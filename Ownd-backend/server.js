const express = require('express');
const logger = require('./utils/logger');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');
const journalRoutes = require('./routes/journalRoutes');
const chatRoutes = require('./routes/chatRoutes');
const dataRoutes = require('./routes/dataRoutes');
const Sentry = require('./utils/sentry');
const { register, httpRequestCounter } = require('./utils/metrics');

const app = express();
app.use(express.json());

// Sentry request handler
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/data', dataRoutes);

// Error Handling
app.use((err, req, res, next) => {
  logger.error(${err.status || 500} -  -  -  - );
  Sentry.captureException(err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

// Sentry error handler
app.use(Sentry.Handlers.errorHandler());

sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    logger.info(Server running on port );
  });
});

module.exports = app;
