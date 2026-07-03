const { Schema, model } = require("mongoose");

const vaultSchema = new Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
   },},

   {
    timestamps: true,
   })

const Vault = model("Vault", vaultSchema);

module.exports = Vault;