const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  uid: { type: String, required: true },
  categoryName: { type: String, required: true },
}, { timestamps: true });

categorySchema.index({ uid: 1, categoryName: 1}, { unique: true });

// This pattern prevents the OverwriteModelError
module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);

