const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const helmet = require('helmet');
const helmet = require('helmet');
const app = express();
app.use(helmet());
app.use(helmet());
app.use(express.json());
app.use(cors());

// Import Routes
const userRoutes = require('./routes/users');
const habitRoutes = require('./routes/habits');
const journalRoutes = require('./routes/journals');
const chatRoutes = require('./routes/chats');

app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/chats', chatRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(\Server running on port \\)))
  .catch(err => console.error(err));
