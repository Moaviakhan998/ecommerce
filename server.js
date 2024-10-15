import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './db.js';
import authroute from './Routes/Authroute.js'
import CategoryRoute from'./Routes/CategoryRoute.js';
import ProductRoute from './Routes/ProdctRoute.js'
import cors from "cors"
//config
 dotenv.config()

 //database config

 connectDB();
 //res object
const app = express();
//middelwares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
//routes
app.use('/api/v1/auth', authroute);
app.use('/api/v1/category', CategoryRoute)
app.use('/api/v1/product', ProductRoute)
//rest api
app.get('/', (req, res)=>{
    res.send("<h1>Well come to E-commerce app</h1>");
});

//port
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server Running on the ${PORT}` )
})