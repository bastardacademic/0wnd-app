const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ownd', { useNewUrlParser: true });

app.use(express.json());

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));
