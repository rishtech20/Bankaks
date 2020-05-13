const User = require("../database/models/user");
const bcrypt = require("bcryptjs");

module.exports = class UserService {
  async createUser(data) {
    if (await User.findOne({ phoneNumber: data.phoneNumber })) {
      throw "Account already exists";
    }
    const user = new User(data);

    user.password = bcrypt.hashSync(data.password, 10);

    try {
      await user.save();
      const token = await user.generateAuthToken();
      console.log(token);
      return { user, token };
    } catch (err) {
      throw new Error("Failed to create a new User", err);
    }
  }

  async findUserByCredentials(data) {
    console.log(data);
    const user = await User.findOne({ phoneNumber: data.phoneNumber });
    console.log(user);
    if (!user) {
      throw new Error({ error: "Invalid login credentials" });
    }
    const isPasswordMatch = await bcrypt.compare(data.password, user.password);
    console.log(isPasswordMatch);
    if (!isPasswordMatch) {
      throw new Error({ error: "Invalid login credentials" });
    }
    const token = await user.generateAuthToken();

    return { user, token };
  }

  async createContact(user, data) {
    const contact = { name: data.name, mob_number: data.mob_number };
    user.contacts = user.contacts.concat(contact);

    await user.save();
  }
};
