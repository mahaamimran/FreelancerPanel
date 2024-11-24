const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const app = express();
dotenv.config();

connectDB(); // Connect to database

app.use(express.json()); // Body parser

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);


const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
