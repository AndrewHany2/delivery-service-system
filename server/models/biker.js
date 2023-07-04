const { model, Schema } = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(require("mongoose"));

const BikerSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    parcels: [{ type: Schema.Types.ObjectId, ref: "Parcel" }],
  },
  { timestamps: true }
);
BikerSchema.plugin(AutoIncrement, {
  id: "bikerCounter",
  inc_field: "recordId",
  start_seq: "10000",
});
module.exports.BikerModel = model("Biker", BikerSchema);
