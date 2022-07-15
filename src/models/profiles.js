//const joi = require("joi");
const mongoose = require("mongoose");
//const _ = require("lodash");

const profileSchema = new mongoose.Schema({
  discordId: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  playerTag: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  verified: {
    type: Boolean,
    require: false,
    default: false,
  },
  verifyQuest: {
    type: String,
    require: false,
  },
});

const Profile = mongoose.model("Profile", profileSchema, "profiles");

module.exports = {
  Profile,
};
