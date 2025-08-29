const express = require('express');
const router = express.Router();
const { sendQuoteRequest, sendContactEmail, subscribeNewsletter } = require('../controller/email.controller');

// POST route for sending quote requests
router.post('/send-quote', sendQuoteRequest);

// POST route for sending contact emails
router.post('/send-contact', sendContactEmail);

// POST route for newsletter subscriptions
router.post('/subscribe-newsletter', subscribeNewsletter);

module.exports = router;
