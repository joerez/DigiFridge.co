const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
//app.use(express.static('views'));
app.use(express.static('public/css'));
app.use(express.static('public/scripts'));

app.use(bodyParser.urlencoded({ extended: false }));

require('./sockets/server-sockets')(io);

let Paragraph = require('./models/paragraph');
mongoose.connect(process.env.MONGO_URI || 'localhost:27017/parasaverDb', (err)=>{
  console.log("Connected to Parasaver DB");
})

//ROUTE
app.get('/', (req, res) =>  {
  Paragraph.find({}, (err, paragraphs) =>{
    res.render('mother-fridge', {paragraphs : paragraphs});
  })
});

//DELETE
app.delete('/:id', function (req, res) {
  console.log("DELETE magnet")
  Paragraph.findByIdAndRemove(req.params.id).then((paragraph) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})


/*******************No longer needed****************
 app.post('/', (req, res) => {
   let paragraph = new Paragraph({text : req.body.paragraph});
   paragraph.save((err)=>{
     res.redirect('/');
   });
 })
****************************************************/


app.get('/testfridge', (req, res) => {
  res.render('fridge');
})



server.listen(process.env.PORT || '3000', (err) => {
  console.log("Listening on Port 3000");
});
