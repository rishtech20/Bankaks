const express = require("express");
const UserService = require("../services/user");
const auth = require("../_helpers/auth");
const MessageBirdService = require("../services/messageBird");

const router = express.Router();

router.post("/user/register", async (req, res) => {
  const user = new UserService();
  if (!req.body.phoneNumber || !req.body.password) {
    res
      .status(400)
      .send({ message: "Phone Number and Password are required!" });
  }
  let payload = undefined;
  try {
    payload = await user.createUser(req.body);
    res.status(201).send({ token: payload.token });
  } catch (err) {
    res.status(400).send({ message: "User already exists!" });
  }
});

router.post("/user/login", async (req, res) => {
  const userServiceInstance = new UserService();
  if (!req.body.phoneNumber || !req.body.password) {
    res
      .status(400)
      .send({ message: "Phone Number and Password are required!" });
  }
  try {
    const { user, token } = await userServiceInstance.findUserByCredentials(
      req.body
    );
    console.log(user);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/user/create-contact", auth, async (req, res) => {
  if (!req.body.name || !req.body.mob_number) {
    res.status(400).send({ message: "Phone Number and Name are required!" });
  }
  const messageBird = new MessageBirdService();
  const user = new UserService();
  let validNumber = undefined;
  try {
    const validity = await messageBird.validateNumber(req.body.mob_number);
    if (validity.formats) {
      validNumber = validity.formats.e164;
    }
    user.createContact(req.user, {
      name: req.body.name,
      mob_number: validNumber,
    });
    res.status(201).send({ message: "Contact Created", data: req.body });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/user/test-me", auth, async (req, res) => {
  res.status(200).send("Works like a charm!");
});

module.exports = router;
