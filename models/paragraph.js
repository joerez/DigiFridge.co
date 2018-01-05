const mongoose = require('mongoose');

const ParagraphSchema = new mongoose.Schema({
  text : String
})

let Paragraph = mongoose.model("Paragraph", ParagraphSchema);

module.exports = Paragraph
