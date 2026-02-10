// Simple Express server for Daily Goals Tracker
// Provides endpoints to get, add, update, and delete goals using in-memory mock data.

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins (for development)
app.use(bodyParser.json()); // Parse JSON request bodies

// Mock data stored in-memory
let goals = [
  {
    id: uuidv4(),
    title: 'Morning Run',
    description: 'Run 3km around the park',
    completed: false,
    deleted: false,
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Read a Book',
    description: 'Read 30 pages of a novel',
    completed: true,
    deleted: false,
    createdAt: new Date().toISOString()
  }
];

// GET /goals - return all goals (including deleted/completed flags)
app.get('/goals', (req, res) => {
  res.json(goals);
});

// POST /goals - add a new goal
app.post('/goals', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newGoal = {
    id: uuidv4(),
    title,
    description: description || '',
    completed: false,
    deleted: false,
    createdAt: new Date().toISOString()
  };
  goals.push(newGoal);
  res.status(201).json(newGoal);
});

// PUT /goals/:id - update a goal (partial updates supported)
app.put('/goals/:id', (req, res) => {
  const { id } = req.params;
  const index = goals.findIndex(g => g.id === id);
  if (index === -1) return res.status(404).json({ error: 'Goal not found' });

  const updated = { ...goals[index], ...req.body };
  goals[index] = updated;
  res.json(updated);
});

// DELETE /goals/:id - mark a goal as deleted (soft delete)
app.delete('/goals/:id', (req, res) => {
  const { id } = req.params;
  const index = goals.findIndex(g => g.id === id);
  if (index === -1) return res.status(404).json({ error: 'Goal not found' });

  // For safety, perform a soft delete by setting deleted flag
  goals[index].deleted = true;
  res.json({ success: true });
});

// Fallback route
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Daily Goals backend running on http://localhost:${PORT}`);
});
