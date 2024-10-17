import mongoose, { connect } from 'mongoose';

const connectDB = async()=>{
 try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`Connecteed to Mongodb Database ${conn.connection.host}`);
 } catch (error) {
    console.log(`Error In Mongodb ${error}`)
 }
}
export default connectDB;