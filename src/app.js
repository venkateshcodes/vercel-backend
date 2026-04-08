const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// STATIC FILES
app.use('/uploads', express.static('uploads'));

// ROUTES
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/papers', require('./routes/paperRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));  // 👈 ADD THIS LINE

module.exports = app;