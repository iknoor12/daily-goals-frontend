# Backend (Express)

This is a minimal Express server for the Daily Goals Tracker.

Install and run:

```bash
cd backend
npm install
npm start
```

API endpoints:
- GET /goals
- POST /goals { title, description }
- PUT /goals/:id
- DELETE /goals/:id (soft delete)

Notes: Data is stored in-memory; restarting the server resets data.
