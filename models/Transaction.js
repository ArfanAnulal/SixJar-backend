var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema({
    uid:{type:String, required:true},
    type:{type:String, required:true, enum: ['Income', 'Expense']},
    jarName:{type:String, required:true, enum: ['Necessities', 'Savings', 'Education', 'Play', 'Give', 'Investment', 'Split between jars']},
    amount:{type:Number, default:0, min: 0},
    notes:{type:String, default:""},
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
}, { timestamps: true })

transactionSchema.index({ uid: 1 });

var Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);