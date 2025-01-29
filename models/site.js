const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  siteName: String,
  siteUrl: String,
  description: String,
  price: Number,
  githubUrl: String,
  image:{
    url:String,
    filename:String,
  }, // Field to store the image path
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  earnings: { type: Number, default: 0 },
  published: { type: Boolean, default: false },
});

module.exports = mongoose.model('Site', siteSchema);
