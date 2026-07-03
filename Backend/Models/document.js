const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      default: "",
    },

    vault: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vault",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Document", documentSchema);