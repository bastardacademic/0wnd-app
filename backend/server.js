const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/api/users', require('./routes/users'));
app.use('/api/rituals', require('./routes/rituals'));
app.use('/api/chats', require('./routes/chats'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/journal', require('./routes/journal'));
app.use('/api/xp', require('./routes/xp'));
app.use('/api/devotion', require('./routes/devotion'));
app.use('/api/burn', require('./routes/burn'));
app.use('/api/mfa', require('./routes/mfa'));
app.use('/api/user', require('./routes/user'));
app.use('/api/ritual-log', require('./routes/ritualLog'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error('MongoDB connection failed:', err));