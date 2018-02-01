const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ParagraphSchema = new mongoose.Schema({
  text : { type: String, minlength: 1 },
  pos : {
    top : String,
    left : String
  },
  username: { type: Schema.Types.ObjectId, ref: 'User' },
});

let Paragraph = mongoose.model("Paragraph", ParagraphSchema);

module.exports = Paragraph
