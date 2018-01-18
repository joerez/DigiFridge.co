const mongoose = require('mongoose');

const ParagraphSchema = new mongoose.Schema({
  text : { type: String, minlength: 1 },
  pos : {
    top : String,
    left : String
  }
});

let Paragraph = mongoose.model("Paragraph", ParagraphSchema);

module.exports = Paragraph
