const mongoose = require('mongoose');

const PersonalFridgeSchema = new mongoose.Schema({
  user : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  paragraphs : [{ type: Schema.Types.ObjectId, ref: 'paragraph' }]

});

let Fridge = mongoose.model("Fridge", PersonalFridgeSchema);

module.exports = Fridge
