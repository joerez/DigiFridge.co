const mongoose = require('mongoose');

const trashSchema = new mongoose.Schema({
  pos : {
    top : String,
    left : String
  }
});

let Trash = mongoose.model("Trash", trashSchema);

module.exports = Trash
