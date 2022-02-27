const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    listingId: {
        type: String,
        required: [true, 'Please enter Listing ID'],
        trim: true,
        lowercase: true
      },
    listingTitle: {
    type: String,
    required: [true, 'Please enter Listing title'],
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, " Please enter a description of your listing"],
    trim: true,
    lowercase: true
  },
  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  street: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    //index: true, //Optional if unique is defined
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    uppercase: true,
    //minlength:10,
    //maxlength: 50,
    //Custom validation
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  

  created: { 
    type: Date,
    default: Date.now,
    alias: 'createdat'
  },
  updatedat: { 
    type: Date,
    default: Date.now
  },
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;