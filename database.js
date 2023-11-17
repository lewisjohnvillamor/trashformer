
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://lewisvillamor26pethoodie:ala8MyFxfAHKjxdi@cluster0.59szop1.mongodb.net/?retryWrites=true&w=majority";
let db = null;
async function connectDB() {
    if (db) return db;
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db('Cluster0'); // Replace with your database name
        console.log("Connected to MongoDB");
        return db;
    } catch (err) {
        console.error("Could not connect to MongoDB", err);
        throw err;
    }
}

module.exports = { connectDB };