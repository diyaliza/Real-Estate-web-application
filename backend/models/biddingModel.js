const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  biddingId: {
    type: String,
    required: true,
    default: () => Math.random().toString(36).substr(2, 9),  // Generate a random string
  },
  listingId: {
    type: Number,
    required: true,
  },
  listingName: {
    type: String,
    required: true,
  },
  biddingPrice: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  // Add other necessary fields as needed
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
