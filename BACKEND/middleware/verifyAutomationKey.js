// ./middleware/verifyAutomationKey.js
module.exports = (req, res, next) => {
  try {
    const key = req.headers['x-automation-key'] || req.headers['x-automation-key'.toLowerCase()];
    if (!key || key !== process.env.AI_AUTOMATION_KEY) {
      return res.status(401).json({ message: 'Unauthorized automation call' });
    }
    // optionally attach info for audit
    req.automation = { by: 'magic-loops' };
    next();
  } catch (err) {
    console.error('verifyAutomationKey error', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};