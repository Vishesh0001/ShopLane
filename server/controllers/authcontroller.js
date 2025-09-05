const bcrypt = require('bcrypt');
const User = require('../models/User');
const schema = require('../utilities/validationSchema');
const validateWithJoi = require('../middleware/validate');
const common=require('../utilities/common');
class AuthController {
async signup(req, res) {
  const { fullname, email, password } = req.body;
// console.log(req.body);

  try {
const validationResponse = await validateWithJoi.checkValidation(req.body,schema.signupSchema)
if(validationResponse){
  return res.status(400).json( validationResponse.message.keyword );
}
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the user
    const user = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await user.save();
const token = common.generateToken({ id: user._id });
    // Return the user ID
    res.status(201).json({ token:token  });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
async login(req, res) {
  const { email, password } = req.body;

  try {
    // Validate input with Joi schema
    const validationResponse = await validateWithJoi.checkValidation(req.body, schema.loginSchema);
    if (validationResponse) {
      return res.status(400).json(validationResponse.message.keyword);
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = common.generateToken({ id: user._id });

    // Return token
    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
}
}module.exports = new AuthController();