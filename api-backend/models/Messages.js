const mongoose = require("mongoose");

const messages = new mongoose.Schema(
  {
    conversationId: {
      type: String,
      default: "",
    },
    sender: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messages);
