const { model, Schema } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(require("mongoose"));

const ParcelSchema = new Schema(
  {
    pickupAddress: String,
    dropoffAddress: String,
    pickupDate: Date,
    dropoffDate: Date,
    status: { type: String, default: "PENDING" },
    biker: { type: Schema.Types.ObjectId, ref: "Biker", default: null },
    sender: { type: Schema.Types.ObjectId, ref: "Sender", required: true },
  },
  { timestamps: true }
);

module.exports.ParcelModel = model("Parcel", ParcelSchema);
