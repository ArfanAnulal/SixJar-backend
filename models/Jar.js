var mongoose = require('mongoose');

var jarSchema = mongoose.Schema({
    uid:{type:String, required:true},
    jarName:{type:String, required:true, enum: ['Necessities', 'Savings', 'Education', 'Play', 'Give', 'Investment']},
    currentAmount:{type:Number, default:0},
}, { timestamps: true })

jarSchema.index({ uid: 1 });

var Jar = mongoose.model("Jar", jarSchema);
module.exports = Jar;