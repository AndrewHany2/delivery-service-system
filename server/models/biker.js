const { model, Schema } = require("mongoose");

const BikerSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    parcels: [{ type: Schema.Types.ObjectId, ref: "Parcel" }],
  },
  { timestamps: true }
);
module.exports.BikerModel = model("Biker", BikerSchema);
