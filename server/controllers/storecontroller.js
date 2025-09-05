const Store = require('../models/Store');
const validateWithJoi = require('../middleware/validate');
const schema = require('../utilities/validationSchema');
const jwt = require('jsonwebtoken');
class StoreController {
  async createStore(req, res) {
    try {
      const token = req.headers.token;
   
      
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
      }
      const user_id = jwt.decode(token).id;
   
      

      // Validate incoming store data
      const validationResponse = await validateWithJoi.checkValidation(req.body, schema.storeValidationSchema);
      if (validationResponse) {
        return res.status(400).json(validationResponse.message);
      }

      // Create new store with products array empty by default
      const newStore = new Store({
        user_id,
        storeName: req.body.storeName,
        storeLocation: req.body.storeLocation,
        ownerName: req.body.ownerName,
        contactNumber: req.body.contactNumber,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        products: [],
      });

      await newStore.save();

      return res.status(201).json({ message: 'Store created successfully', store: newStore });
    } catch (err) {
      console.error('Store creation error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }
async getAllStoresbyId(req, res) {
    try{
          const token = req.headers.token;
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
      }
      const user_id = jwt.decode(token).id; 
      // console.log(user_id);
      
 const stores = await Store.find({ user_id });
 if (!stores) {
      return res.status(404).json({ error: 'No stores found' });    
    }
    return res.status(200).json({ stores });
    }catch(err){
      console.error('Fetching stores error:', err);
      return res.status(500).json({ error: 'Server error' });
    }}
async getStoreById(req, res) {
          try {
            console.log(req.params);
    const store = await Store.findById(req.params.storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }else{
      return res.status(200).json(store);
    }
} catch (err) {
    console.error('Fetching store error:', err);
      return res.status(500).json({ error: 'Server error' });
}
  // Additional methods like adding products can be added here later
}
async addProductToStore(req, res) {
    try {
      const { storeId } = req.params;
      console.log(storeId);
      
      const { productName, price, description, quantity } = req.body;
      // Validate incoming product data
      const validationResponse = await validateWithJoi.checkValidation(req.body, schema.productValidationSchema);
      if (validationResponse) {
        return res.status(400).json(validationResponse.message);
      }
      const store = await Store.findById(storeId);
      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }
      const newProduct = {
        productName,
        price,
        description,
        quantity  ,}
      store.products.push(newProduct);
      await store.save();
      return res.status(200).json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
      console.error('Adding product error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
}
async getProductById(req, res) {
  try {
    const { productId } = req.params;
    // console.log(productId);
    // Find the store that contains the product with the given productId
    const store = await Store.findOne({ 'products._id': productId });
    if (!store) {
      return res.status(404).json({ message: "Product not found" });
    } else {
      // Extract the product from the store's products array
      const product = store.products.id(productId);
      // console.log(product);
      return res.status(200).json(product);
    }} catch (err) {
      console.error('Fetching product error:', err);
      return res.status(500).json({ error: 'Server error' });
    }}
async editProductById(req, res) {
  try {
    const { productId } = req.params; 
    const { productName, price, description, quantity } = req.body;
    // Validate incoming product data
    const validationResponse = await validateWithJoi.checkValidation(req.body, schema.productValidationSchema);
    if (validationResponse) {
      return res.status(400).json(validationResponse.message);
    } 
    // Find the store that contains the product with the given productId
    const store = await Store.findOne({ 'products._id': productId }); 
    if (!store) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Update the product details
    const product = store.products.id(productId);
    if (productName !== undefined) product.productName = productName;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;
    if (quantity !== undefined) product.quantity = quantity;
    await store.save();
    return res.status(200).json({ message: "Product updated successfully", product });
  } catch (err) {
    console.error('Updating product error:', err);
    return res.status(500).json({ error: 'Server error' });
  }}
async deleteProductById(req, res) {
  try {
    const { productId } = req.params; 
    // Find the store that contains the product with the given productId
    const store = await Store.findOne({ 'products._id': productId }); 
    if (!store) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Remove the product from the store's products array
    store.products.id(productId).deleteOne()
    await store.save();
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error('Deleting product error:', err);
    return res.status(500).json({ error: 'Server error' });
  }}
async editStoreById(req, res) {
  try {
    const { storeId } = req.params; 
    const { storeName, storeLocation, ownerName, contactNumber, address, city, country } = req.body;
    // Validate incoming store data
    const validationResponse = await validateWithJoi.checkValidation(req.body, schema.storeValidationSchema);
    if (validationResponse) {
      return res.status(400).json(validationResponse.message);
    }
    // Find the store by its ID
    const store = await Store.findById(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    } 
    // Update the store details
    if (storeName !== undefined) store.storeName = storeName;
    if (storeLocation !== undefined) store.storeLocation = storeLocation;
    if (ownerName !== undefined) store.ownerName = ownerName;
    if (contactNumber !== undefined) store.contactNumber = contactNumber;
    if (address !== undefined) store.address = address;
    if (city !== undefined) store.city = city;
    if (country !== undefined) store.country = country;
    await store.save();
    return res.status(200).json({ message: "Store updated successfully", store });
  } catch (err) {
    console.error('Updating store error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
async deleteStoreById(req, res) {
  try {
    const { storeId } = req.params;   
    // Find the store by its ID and delete it
    const store = await Store.findByIdAndDelete(storeId);
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    } 
    return res.status(200).json({ message: "Store deleted successfully" });
  } catch (err) {
    console.error('Deleting store error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
async getAllStores(req, res) {
    try {
      const stores = await Store.find();
      return res.status(200).json({ stores });
    } catch (err) {
      console.error('Fetching all stores error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

}
module.exports = new StoreController();
