const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    listingId: {
        type: String,
        required: [true, 'Please enter Listing ID'],
        trim: true,
        lowercase: true
      },
      bookingId: {
        type: String,
        required: [true, 'Please enter Listing ID'],
        trim: true,
        lowercase: true
      },
      
  bookingDate: { 
    type: Date,
    default: Date.now,
    alias: 'createdat'
  },
  bookingStart: { 
    type: Date,
    alias: 'createdat'
  },
  bookingEnd: { 
    type: Date,
    alias: 'createdat'
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  updatedat: { 
    type: Date,
    default: Date.now
  },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;