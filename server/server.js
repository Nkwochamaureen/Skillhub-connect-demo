const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const User = require('./models/User');
const Task = require('./models/Task');

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = { id: 1, username };
  const token = jwt.sign({ user }, JWT_SECRET);
  res.json({ token });
});

app.get('/api/tasks', (req, res) => {
  Task.find().then(tasks => res.json(tasks));
});

app.listen(process.env.PORT || 5000, () => console.log('Server running on port', process.env.PORT || 5000));