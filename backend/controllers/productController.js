const Product = require('../model/productModel');


exports.createProduct = async (req, res) => {
  try {
    // console.log(req.body);

    const { standardized_name, variations, status } = req.body;
    // const generatedVariations = generateVariations(standardized_name);
    // console.log(generatedVariations);
    // const allVariations = [...variations, ...generatedVariations];
    const product = new Product({
      standardized_name,
      variations: variations,
      status: status || "unmatched" 
    });
   
    const savedProduct = await product.save();
    // console.log("product", savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const generateVariations = (standardizedName) => {
//   const name = standardizedName.toLowerCase();
//   const variations = new Set();
  

//   variations.add(name);
  

//   variations.add(name.replace(/\s+/g, ''));
  

//   variations.add(name.replace(/\s+/g, ' ').trim());

 
//   const chars = name.split('');
//   for (let i = 0; i < 5; i++) {
//     let shuffled = [...chars];
//     for (let j = shuffled.length - 1; j > 0; j--) {
//       const k = Math.floor(Math.random() * (j + 1));
//       [shuffled[j], shuffled[k]] = [shuffled[k], shuffled[j]];
//     }
//     variations.add(shuffled.join(''));
//   }

//   const words = name.split(/\s+/);
//   for (let i = 0; i < 5; i++) { 
//     let shuffledWords = [...words];
//     for (let j = shuffledWords.length - 1; j > 0; j--) {
//       const k = Math.floor(Math.random() * (j + 1));
//       [shuffledWords[j], shuffledWords[k]] = [shuffledWords[k], shuffledWords[j]];
//     }
//     variations.add(shuffledWords.join(' '));
//     variations.add(shuffledWords.join('')); 
//   }

//   return Array.from(variations);
// }


exports.getProductByVariation = async (req, res) => {
  try {
    const { variation } = req.query;
    const product = await Product.findOne({
      variations: { $regex: new RegExp(variation, 'i') }
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { standardized_name, variations, status } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        standardized_name,
        variations,
        status,
        updated_at: Date.now()
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
