const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 1000;
// Middleware
connectDB(); // Connect to the database
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use(cors(
    { origin: '*', // Allow all origins (for development purposes only; restrict in production)
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
      allowedHeaders: ['Content-Type', 'Authorization','token'] }
)); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use('/api',routes)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


