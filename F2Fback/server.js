const express = require ("express"); // Import Express framework
const app = express(); // Create an instance of Express
const db = require('./db');
const mongoose = require('mongoose');
require('dotenv').config();
var cors = require('cors') // Import CORS middleware to enable cross-origin requests
const path = require('path');

// Middleware to handle CORS
app.use(cors()) // Allow all origins by default

// Additional CORS configuration
app.use(
	cors({
		origin:"http://localhost:4002", // Allow requests from this origin (adjust the URL as per your frontend)
		credentials:true, // Allow credentials (cookies, authorization headers) to be included in requests
	})
)

const PORT = process.env.PORT || 3000;


app.use(express.json());



// Use routes


// Start the server on port 3000
app.listen(PORT, () => {
    console.log(`server is on 3000`);
        
})