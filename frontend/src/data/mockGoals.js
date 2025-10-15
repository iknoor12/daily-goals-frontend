// Mock goals used by the frontend initially. Matches backend shape roughly.
export default [
  {
    id: 'g1',
    title: 'Morning Run',
    description: 'Run 3km around the park',
    completed: false,
    deleted: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'g2',
    title: 'Read a Book',
    description: 'Read 30 pages each day',
    completed: true,
    deleted: false,
    createdAt: new Date().toISOString()
  },
  {
    id: 'g3',
    title: 'Meditate',
    description: '10 minutes of breathing',
    completed: false,
    deleted: false,
    createdAt: new Date().toISOString()
  }
]
