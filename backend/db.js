import mongoose, { connect } from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000,
        });
        console.log(`MongoDB connected at ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        throw new Error('MongoDB connection timeout or error');
    }
};
