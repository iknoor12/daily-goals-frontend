const express = require('express');
const {
  listGoals,
  createGoal,
  updateGoal,
  deleteGoal
} = require('../controllers/goalsController');

const router = express.Router();

router.get('/', listGoals);
router.post('/', createGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

module.exports = router;
