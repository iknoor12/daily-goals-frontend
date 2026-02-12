const Goal = require('../models/Goal');

const listGoals = async (req, res) => {
  const { userEmail } = req.query;
  const filter = userEmail ? { userEmail } : {};
  const goals = await Goal.find(filter).sort({ createdAt: -1 });
  res.json(goals);
};

const createGoal = async (req, res) => {
  const { title, description, userEmail } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  if (!userEmail) {
    return res.status(400).json({ error: 'User email is required' });
  }

  const goal = await Goal.create({
    userEmail,
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
