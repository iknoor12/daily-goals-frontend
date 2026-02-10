// Simple Express server for Daily Goals Tracker
// Provides endpoints to get, add, update, and delete goals using in-memory mock data.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const goalsRouter = require('./routes/goals');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// Middleware
app.use(cors()); // Enable CORS for all origins (for development)
app.use(bodyParser.json()); // Parse JSON request bodies

// API routes
app.use('/goals', goalsRouter);

// Fallback route
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Daily Goals backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  });
