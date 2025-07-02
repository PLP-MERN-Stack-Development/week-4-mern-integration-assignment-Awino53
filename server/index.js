import express from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import connectDB from './configs/db.js';
import cors from 'cors';
import router from './routes/authRoutes.js';



dotenv.config();
// Connect to MongoDB
connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Importing the auth routes
app.use('/auth', router);

// Test route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});