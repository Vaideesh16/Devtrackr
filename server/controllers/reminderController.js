const Job = require('../models/Job');

const getUpcomingReminders = async (req, res, next) => {
  try {
    const now = new Date();
    const days = Number(req.query.days || 7);
    const end = new Date(now);
    end.setDate(end.getDate() + days);

    const reminders = await Job.find({
      userId: req.user._id,
      followUpDate: { $gte: now, $lte: end },
      status: { $nin: ['Rejected', 'Offer'] }
    }).sort({ followUpDate: 1 });

    res.status(200).json({ count: reminders.length, reminders });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUpcomingReminders };
