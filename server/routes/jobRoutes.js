const express = require('express');
const { body, query, param } = require('express-validator');
const { getJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { statuses } = require('../models/Job');

const router = express.Router();

const jobValidation = [
  body('companyName').trim().isLength({ min: 1 }).withMessage('Company name is required'),
  body('role').trim().isLength({ min: 1 }).withMessage('Role is required'),
  body('status').optional().isIn(statuses).withMessage(`Status must be one of: ${statuses.join(', ')}`),
  body('dateApplied').isISO8601().withMessage('Date applied must be a valid date'),
  body('followUpDate').optional({ nullable: true, checkFalsy: true }).isISO8601().withMessage('Follow-up date must be a valid date'),
  body('notes').optional({ nullable: true }).isLength({ max: 2000 }).withMessage('Notes cannot exceed 2000 characters')
];

router.use(protect);

router
  .route('/')
  .get(
    [
      query('status').optional().isIn(statuses).withMessage(`Status must be one of: ${statuses.join(', ')}`),
      query('order').optional().isIn(['asc', 'desc']).withMessage('Order must be asc or desc')
    ],
    validate,
    getJobs
  )
  .post(jobValidation, validate, createJob);

router
  .route('/:id')
  .put([param('id').isMongoId().withMessage('Invalid job id'), ...jobValidation], validate, updateJob)
  .delete([param('id').isMongoId().withMessage('Invalid job id')], validate, deleteJob);

module.exports = router;
