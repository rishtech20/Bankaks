const secret = require("../config").secret;
const User = require("../database/models/user");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  let data = undefined;
  try {
    data = jwt.verify(token, secret);
  } catch (err) {
    res.status(401).send({ error: "Malformed Token" });
  }
  try {
    const user = await User.findOne({ _id: data._id, "tokens.token": token });
    if (!user) {
      console.log("User Not Found");
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

module.exports = auth;
