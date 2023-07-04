const { model, Schema } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(require("mongoose"));

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

ParcelSchema.plugin(AutoIncrement, {
  id: "parcelCounter",
  inc_field: "recordId",
  start_seq: "10000",
});
module.exports.ParcelModel = model("Parcel", ParcelSchema);
