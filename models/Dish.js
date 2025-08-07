const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  nameHebrew: {
    type: String,
    required: true
  },
  descriptionHebrew: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String
  },
  isAvailableToday: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Dish', dishSchema);
