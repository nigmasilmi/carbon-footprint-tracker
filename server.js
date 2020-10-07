const express = require('express');
const connectDB = require('./config/db');

const app = express();

// connect to DB
connectDB();

// parser Middleware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'welcome to track your carbon footprint' }));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/viajes', require('./routes/viajes'));
app.use('/api/auth', require('./routes/auth'));

// PORT
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`conecting to the server on port ${PORT}`));

