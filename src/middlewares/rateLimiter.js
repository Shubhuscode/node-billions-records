// src/middlewares/rateLimiter.js
const { RateLimiterMemory } = require('rate-limiter-flexible');

// Create a rate limiter with a max of 1000 requests per minute
const rateLimiter = new RateLimiterMemory({
  points: 1000,
  duration: 60
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip); // Rate limit based on the user's IP
    next();
  } catch (rejRes) {
    res.status(429).send('Too many requests, please try again later.');
  }
};

module.exports = rateLimiterMiddleware;
