const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  standardized_name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  variations: [
    { 
      type: String, 
      required: true 
    }
  ],
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
