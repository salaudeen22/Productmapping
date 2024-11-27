const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  standardized_name: {
    type: String,
    required: true,
    unique: true,
  },
  variations: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["mapped", "unmatched"],
    default: "unmatched",
    required: true,
    index: true 
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Add pre-save middleware to update the updated_at timestamp
productSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

// Add index on status field for better query performance
productSchema.index({ status: 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
