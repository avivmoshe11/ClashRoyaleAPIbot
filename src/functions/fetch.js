require("dotenv").config();
const fetch = require("node-fetch");

module.exports = {
  name: "fetch",
  run: async (endpoint, tag, extra = "") => {
    var error;
    const response = await fetch(`https://proxy.royaleapi.dev/v1/${endpoint}/${tag}/${extra}`, {
      //api.clashroyale.com
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.API_TOKEN}` },
    }).catch((err) => (error = err));
    return { response: await response.json(), err: error };
  },
};
