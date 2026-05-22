const mongoose = require('mongoose');

const statuses = ['Applied', 'OA', 'Interview', 'Rejected', 'Offer'];

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [120, 'Company name cannot exceed 120 characters']
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
      maxlength: [120, 'Role cannot exceed 120 characters']
    },
    status: {
      type: String,
      enum: statuses,
      default: 'Applied'
    },
    dateApplied: {
      type: Date,
      required: [true, 'Date applied is required'],
      default: Date.now
    },
    followUpDate: {
      type: Date
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters']
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    }
  },
  { timestamps: true }
);

jobSchema.index({ userId: 1, dateApplied: -1 });
jobSchema.index({ userId: 1, status: 1 });
jobSchema.index({ userId: 1, followUpDate: 1 });

module.exports = mongoose.model('Job', jobSchema);
module.exports.statuses = statuses;
