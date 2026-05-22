const Job = require('../models/Job');
const { statuses } = require('../models/Job');

const getAnalytics = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [totalApplications, statusCounts] = await Promise.all([
      Job.countDocuments({ userId }),
      Job.aggregate([
        { $match: { userId } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);

    const applicationsPerStatus = statuses.reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {});

    statusCounts.forEach((item) => {
      applicationsPerStatus[item._id] = item.count;
    });

    const responses =
      applicationsPerStatus.OA + applicationsPerStatus.Interview + applicationsPerStatus.Offer;
    const interviews = applicationsPerStatus.Interview + applicationsPerStatus.Offer;
    const responseRate = totalApplications ? Number(((responses / totalApplications) * 100).toFixed(1)) : 0;
    const interviewConversionRate = totalApplications
      ? Number(((interviews / totalApplications) * 100).toFixed(1))
      : 0;

    const insights = [];
    if (totalApplications === 0) {
      insights.push('Start by adding your recent applications to unlock trend insights.');
    }

    if (totalApplications >= 10 && responseRate < 10) {
      insights.push('Your response rate is below 10%. Try tailoring your resume and outreach for each role.');
    }

    if (applicationsPerStatus.Rejected >= 5 && applicationsPerStatus.Rejected >= totalApplications * 0.5) {
      insights.push('Rejections are clustering. Review your resume, portfolio, and role fit before the next batch.');
    }

    if (interviewConversionRate >= 25) {
      insights.push('Interview conversion is strong. Keep prioritizing similar roles and application channels.');
    }

    res.status(200).json({
      totalApplications,
      applicationsPerStatus,
      responseRate,
      interviewConversionRate,
      insights
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAnalytics };
