// db.js
const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/admin_panel', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;