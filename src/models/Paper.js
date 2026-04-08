const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  title: String,
  file: String,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model('Paper', paperSchema);