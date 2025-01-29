const mongoose = require('mongoose');

const connectWithUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  linkedin: { type: String, required: true },
  github: { type: String, required: true },
  metamask: { type: String, required: true },
  image:{
    url:String,
    filename:String,
  }, 
});

const ConnectWithUs = mongoose.model('ConnectWithUs', connectWithUsSchema);

module.exports = ConnectWithUs;
