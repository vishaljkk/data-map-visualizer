const mongoose = require('mongoose');

const CoordinateSchema = new mongoose.Schema({
  xCoordinate: {
    type: Number,
    required: [true, 'Please provide the x-coordinate']
  },
  yCoordinate: {
    type: Number,
    required: [true, 'Please provide the y-coordinate']
  },
  label: {
    type: String,
    required: [true, 'Please provide the label']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Coordinate', CoordinateSchema);
