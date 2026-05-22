const Job = require('../models/Job');
const AppError = require('../utils/appError');

const getJobs = async (req, res, next) => {
  try {
    const {
      search = '',
      status,
      sortBy = 'dateApplied',
      order = 'desc'
    } = req.query;

    const query = { userId: req.user._id };

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } }
      ];
    }

    const allowedSorts = ['companyName', 'role', 'status', 'dateApplied', 'followUpDate', 'createdAt'];
    const sortField = allowedSorts.includes(sortBy) ? sortBy : 'dateApplied';
    const sortDirection = order === 'asc' ? 1 : -1;

    const jobs = await Job.find(query).sort({ [sortField]: sortDirection, createdAt: -1 });

    res.status(200).json({ count: jobs.length, jobs });
  } catch (error) {
    next(error);
  }
};

const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      ...req.body,
      userId: req.user._id
    });

    res.status(201).json({ job });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      throw new AppError('Job application not found', 404);
    }

    res.status(200).json({ job });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!job) {
      throw new AppError('Job application not found', 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob
};
