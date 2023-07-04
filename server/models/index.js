const { SenderModel } = require("./sender");
const { BikerModel } = require("./biker");
const { ParcelModel } = require("./parcel");

module.exports = {
  Parcel: ParcelModel,
  Sender: SenderModel,
  Biker: BikerModel,
};
