const express = require('express');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
const commentRoutes = require('./routes/commentRoutes.js'); 
const { connectDB } = require('./database');
const cors = require('cors');
require('dotenv').config();

const app = express();  // Create an instance of Express

app.use(cors()); // Use CORS middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/contact', contactRoutes);

app.use('/api/comments', commentRoutes); // Use comment routes

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(error => {
    console.error("Failed to connect to MongoDB", error);
});
