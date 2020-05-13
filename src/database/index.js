const mongoose = require("mongoose");
const config = require("../config");

const uri = `mongodb+srv://${config.mongo_username}:${config.mongo_password}@${config.mongo_clustername}.mongodb.net/test?retryWrites=true&w=majority`;

const connectDB = async () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Bankaks",
  });
};

module.exports = connectDB;
