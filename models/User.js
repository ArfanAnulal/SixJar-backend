var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    uid:{type:String, required:true, unique: true },
    name:{type:String, required:true},
    email:{type:String, required:true, unique: true, lowercase: true, trim: true}
}, { timestamps: true })

// This pattern prevents the OverwriteModelError
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
