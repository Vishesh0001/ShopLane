const express = require('express');
const router = express.Router();
const controller = require('../controllers/authcontroller');
const storeController = require('../controllers/storecontroller');
// const { validateSignup } = require('../mi/ddleware/validate');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post ('/create-store', storeController.createStore);
router.get('/stores', storeController.getAllStoresbyId);
router.get('/stores/:storeId', storeController.getStoreById);
router.post('/addproduct/:storeId', storeController.addProductToStore);
router.get('/getproduct/:productId', storeController.getProductById);
router.put('/editproduct/:productId', storeController.editProductById);
router.delete('/deleteproduct/:productId', storeController.deleteProductById);
router.put('/editstores/:storeId', storeController.editStoreById);
router.delete('/deletestore/:storeId', storeController.deleteStoreById);
router.get('/getallstores', storeController.getAllStores);
module.exports = router;