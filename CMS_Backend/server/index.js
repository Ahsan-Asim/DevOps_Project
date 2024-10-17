const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const { connectMongoDb } = require('./connection');
const UserModel = require("./model/User"); // You can keep this or remove it based on your use case
const userRoutes = require("./routes/userRoutes"); // Import the user routes
const schoolRoutes = require('./routes/schoolRoutes');


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL
    credentials: true
}));

//connectMongoDb('mongodb://localhost:27017/CMS');
//
connectMongoDb('mongodb://mongodb:27017/CMS'); // Replace yourDatabaseName with your actual DB name

app.use("/api/users", userRoutes); // Use the user routes
app.use('/api/schools', schoolRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
