const mongoose = require('mongoose');


const listingSchema = new mongoose.Schema({
  listingId: { type: Number, required: true, unique: true },
  bathrooms: { type: Number, required: [true, 'Please provide the number of bathrooms'] },
  bedrooms: { type: Number, required: [true, 'Please provide the number of bedrooms'] },
  contactEmail: { type: String, required: [true, 'Please provide the contact email'] },
  contactName: { type: String, required: [true, 'Please provide the contact name'] },
  contactPhone: { type: String, required: [true, 'Please provide the contact phone number'] },
  description: { type: String, required: [true, 'Please provide a description'] },
  location: { type: String, required: [true, 'Please provide the location'] },
  price: { type: Number, required: [true, 'Please provide the price'] },
  title: { type: String, required: [true, 'Please provide a title'] },
  bids: { type: Number, default: 0 },
  status: {type: String, enum: ['Active', 'Closed'],default: 'Active'}
});

// Apply the auto-increment plugin to the listingId field


const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
