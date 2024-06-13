const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
},{timestamps:true});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
