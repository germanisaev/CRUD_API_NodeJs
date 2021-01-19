const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

const loginSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    active: { type: Boolean, default: false }
});

/*
userSchema.plugin(mongoosastic, {
    hosts: [
      'localhost:9200'  
    ] 
 });
 */

module.exports = mongoose.model('Login', loginSchema);