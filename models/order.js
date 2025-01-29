// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  websiteRequirement: String,
  techStack: String,
  collegeName: String,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
