const { model, Schema } = require("mongoose");

const SenderSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    parcels: [{ type: Schema.Types.ObjectId, ref: "Parcel" }],
  },
  { timestamps: true }
);
// SenderSchema.index({ rec: 1 });
module.exports.SenderModel = model("Sender", SenderSchema);
