const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.set('view engine', 'jade');
app.use(express.static('views'));
app.use(express.static('public/css'));
app.use(express.static('public/scripts'));
app.use(bodyParser.urlencoded({ extended: false }));


let Paragraph = require('./models/paragraph');
mongoose.connect('localhost:27017/parasaverDb', (err)=>{
  console.log("Connected to Parasaver DB");
})

app.get('/', (req, res) =>  {
  Paragraph.find({}, (err, paragraphs) =>{
    res.render('index', {paragraphs : paragraphs});
  })
});

app.post('/', (req, res) => {
  let paragraph = new Paragraph({text : req.body.paragraph});
  paragraph.save((err)=>{
    res.redirect('/');
  });
})

app.listen(Process.env.PORT || '3000', (err) => {
  console.log("Listening on Port 3000");
});
