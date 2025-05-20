var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    uid:{type:String, required:true, unique: true },
    name:{type:String, required:true},
    email:{type:String, required:true},
}, { timestamps: true })

var User = mongoose.model("user", userSchema);
module.exports = User;