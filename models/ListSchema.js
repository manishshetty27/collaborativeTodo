const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: { type: String, required: true, trim: true },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const List = mongoose.model("List", ListSchema);

module.exports = { List };
