const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

const storeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  storeName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
  storeLocation: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  products: {
    type: [productSchema],
    default: [],
  },
}, { timestamps: true });

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
