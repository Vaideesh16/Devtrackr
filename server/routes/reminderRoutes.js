const express = require('express');
const { query } = require('express-validator');
const { getUpcomingReminders } = require('../controllers/reminderController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');

const router = express.Router();

router.get(
  '/',
  protect,
  [query('days').optional().isInt({ min: 1, max: 30 }).withMessage('Days must be between 1 and 30')],
  validate,
  getUpcomingReminders
);

module.exports = router;
