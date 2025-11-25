const mongoose = require('mongoose');

async function connect() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.log("Failed to connect to MongoDB. Error: ", err)
    }
}

module.exports = connect;