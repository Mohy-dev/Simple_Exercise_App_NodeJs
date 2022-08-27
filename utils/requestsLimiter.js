const rateLimit = require("express-rate-limit");

// Modify x-rate-limit in the headers
var countMax = 8;
const requestsLimiter = rateLimit({
  max: countMax,
  windowsMS: 1000 * 60 * 0.5,
  message: "Too many requests, try again later",
});

module.exports = requestsLimiter;
