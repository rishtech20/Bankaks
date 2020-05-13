const axios = require("axios");
const base_uri = require("../config").message_bird_api_base;
const api_key = require("../config").message_bird_api_key;

module.exports = class MessageBirdService {
  async validateNumber(number) {
    const uri = `${base_uri}/${number}`;
    const authStr = `AccessKey ${api_key}`;
    try {
      const res = await axios.get(uri, { headers: { Authorization: authStr } });
      return res.data;
    } catch (err) {
      console.log(err.response.data.errors);

      throw {
        errors: err.response.data.errors.map((err) => ({
          error: err.description,
        })),
      };
    }
  }
};
