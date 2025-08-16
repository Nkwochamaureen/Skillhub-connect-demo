const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/task'); // Adjust path to task.js

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/serenity', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.listen(5000, () => console.log('Server running on port 5000'));