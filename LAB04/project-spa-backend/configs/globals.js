require("dotenv").config();

module.exports = {
    ConnectionStrings: {
        MongoDB: process.env.CONNECTION_STRING_MONGODB
    },
    db: process.env.DB_CONNECTION,
    clientServer: 'http://localhost:4200'
};
