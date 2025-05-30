// config/db.js
import mongoose from 'mongoose';

const connectdb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/issue-tracker', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectdb;