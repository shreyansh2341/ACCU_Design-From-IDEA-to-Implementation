const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');

const sanitizeMiddleware = [
  mongoSanitize(), 
  xssClean()       
];

module.exports = sanitizeMiddleware;
