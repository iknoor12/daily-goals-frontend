const Goal = require('../models/Goal');

const listGoals = async (req, res) => {
  const goals = await Goal.find().sort({ createdAt: -1 });
  res.json(goals);
};

const createGoal = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const goal = await Goal.create({
    title,
    description: description || ''
  });

  res.status(201).json(goal);
};

const updateGoal = async (req, res) => {
  const { id } = req.params;
  const updated = await Goal.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updated) {
    return res.status(404).json({ error: 'Goal not found' });
  }

  res.json(updated);
};

const deleteGoal = async (req, res) => {
  const { id } = req.params;
  const updated = await Goal.findByIdAndUpdate(
    id,
    { deleted: true },
    { new: true }
  );

  if (!updated) {
    return res.status(404).json({ error: 'Goal not found' });
  }

  res.json({ success: true });
};

module.exports = {
  listGoals,
  createGoal,
  updateGoal,
  deleteGoal
};
