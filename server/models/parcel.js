const { model, Schema } = require("mongoose");

const ParcelSchema = new Schema(
  {
    pickupAddress: String,
    dropoffAddress: String,
    pickupTimestamp: Date,
    deliveryTimestamp: Date,
    status: String,
    biker: { type: Schema.Types.ObjectId, ref: "Biker" },
  },
  { timestamps: true }
);
module.exports.ParcelModel = model("Parcel", ParcelSchema);
