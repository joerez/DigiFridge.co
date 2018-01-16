const mongoose = require('mongoose');

const ParagraphSchema = new mongoose.Schema({
  text : String,
  pos : {
    top : String,
    left : String
  }
});

let Paragraph = mongoose.model("Paragraph", ParagraphSchema);

module.exports = Paragraph
