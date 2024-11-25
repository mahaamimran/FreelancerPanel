const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Apply CORS middleware BEFORE defining routes
app.use(cors());



// Apply JSON body parser middleware
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");
const jobRoutes = require("./routes/jobRoutes");

app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/jobs", jobRoutes);

// Middleware for error handling
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
