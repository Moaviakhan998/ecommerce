import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';  // <-- Import mongoose here
import connectDB from './db.js';
import authroute from './Routes/Authroute.js';
import CategoryRoute from './Routes/CategoryRoute.js';
import ProductRoute from './Routes/ProdctRoute.js';
import cors from 'cors';

// config
dotenv.config();

// database config
connectDB();

// res object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Timeout middleware (10 seconds)
app.use((req, res, next) => {
    req.setTimeout(10000); // 10 seconds
    next();
});

// MongoDB connection status route
app.get('/api/v1/mongo-status', (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.status(200).json({ success: true, message: 'MongoDB is connected',mongoURL: process.env.MONGO_URL });
    } else {
        res.status(500).json({ success: false, message: 'MongoDB is not connected' });
    }
});

// routes
app.use('/api/v1/auth', authroute);
app.use('/api/v1/category', CategoryRoute);
app.use('/api/v1/product', ProductRoute);

// rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to E-commerce app</h1>");
});

// port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
