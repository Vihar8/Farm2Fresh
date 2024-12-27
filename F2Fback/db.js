require('dotenv').config();
const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL;

if (!mongoURL) {
    console.error("MONGODB_URL is not defined in the environment variables.");
    process.exit(1); // Exit the process if the URL is missing
}

mongoose.connect(mongoURL, { 
    useNewUrlParser: true, // 'useNewUrlParser' is still valid
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB'); 
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);  
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});
