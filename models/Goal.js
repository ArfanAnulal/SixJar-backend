const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  goalName: { type: String, required: true, trim: true },
  targetAmount: { type: Number, required: true, min: 0 },
  savedAmount: { type: Number, default: 0 },
  status: { type: String, enum: ['In Progress', 'Completed'], default: 'In Progress' },
}, { timestamps: true });

goalSchema.index({ uid: 1 });

const Goal = mongoose.model('Goal', goalSchema);
module.exports = mongoose.models.Goal || mongoose.model("Goal", goalSchema);
