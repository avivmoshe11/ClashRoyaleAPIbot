require("dotenv").config();
const fetch = require("node-fetch");

module.exports = {
  name: "fetch",
  run: async (endpoint, tag) => {
    let error;
    const response = await fetch(`https://api.clashroyale.com/v1/${endpoint}/${tag}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.API_TOKEN}` },
    }).catch((err) => (error = err));
    return { response: await response.json(), err: error };
  },
};
