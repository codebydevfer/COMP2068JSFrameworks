require("dotenv").config();

const configurations = {
    ConnectionStrings: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB
    }
}

module.exports = configurations;

module.exports = {
    db: process.env.DB_CONNECTION,
    clientServer: 'http://localhost:4200'
};