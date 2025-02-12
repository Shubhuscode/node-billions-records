const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  points: 1000,
  duration: 60
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip); 
    next();
  } catch (rejRes) {
    res.status(429).send('Too many requests, please try again later.');
  }
};

module.exports = rateLimiterMiddleware;
