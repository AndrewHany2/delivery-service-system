const { model, Schema } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(require("mongoose"));

const SenderSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    parcels: [{ type: Schema.Types.ObjectId, ref: "Parcel" }],
  },
  { timestamps: true }
);

module.exports.SenderModel = model("Sender", SenderSchema);
