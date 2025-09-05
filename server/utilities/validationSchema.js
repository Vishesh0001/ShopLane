const joi = require('joi');
const Joi = require('joi');
const ValidationSchemas = {
  signupSchema: joi.object({
    fullname: joi.string().min(2).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  }),
  loginSchema: Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}),
 storeValidationSchema :Joi.object({
  storeName: Joi.string().min(3).max(200).required(),
  storeLocation: Joi.string().required(),
  ownerName: Joi.string().required(),
  contactNumber: Joi.string().required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),

}),
  productValidationSchema :Joi.object({ 
    productName: Joi.string().min(1).max(200).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().max(1000).allow(''),
    quantity: Joi.number().min(0).required(),
  }),
};
module.exports = ValidationSchemas;