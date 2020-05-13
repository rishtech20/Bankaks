const dotenv = require("dotenv");

const env = dotenv.config();

if (env.error) {
  throw new Error("🔥 Failed to load environment");
}

module.exports = {
  port: process.env.PORT,

  // MongoDB Atlas Configuration
  mongo_username: process.env.MONGO_USER_NAME,
  mongo_password: process.env.MONGO_USER_PASSWORD,
  mongo_clustername: process.env.MONGO_CLUSTER_NAME,

  // Auth
  secret: process.env.JWT_SECRET,

  // Message Bird
  message_bird_api_key: process.env.MESSAGE_BIRD_API_KEY,
  message_bird_api_base: process.env.MESSAGE_BIRS_LOOKUP_API_BASE,
};
