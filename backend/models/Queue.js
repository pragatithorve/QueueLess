const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema({
  name: String,
  service: String, // ⭐ IMPORTANT (hospital/bank/etc)
  time: String,
  isVIP: Boolean
});

module.exports = mongoose.model("Queue", QueueSchema);