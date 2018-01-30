const express = require('express');

require('dotenv').config();

var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./sockets/server-sockets')(io);

let Paragraph = require('./models/paragraph');

mongoose.connect(process.env.MONGO_URI || 'localhost:27017/parasaverDb', (err)=>{
  console.log("Connected to Parasaver DB");
})

//checkAuth middleware
var checkAuth = (req, res, next) => {
  //console.log("Checking authentication");
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  //  console.log(req.user)
  }

  next()
}

app.use(cookieParser());

app.use(checkAuth);

//ROUTE
app.get('/', (req, res) =>  {

  currentUser = req.User;

  Paragraph.find({}, (err, paragraphs) =>{
    res.render('mother-fridge', {paragraphs : paragraphs, currentUser : req.user});
  })
});

app.get('/fridges/:username', (req, res) => {
  //const username = req.params.username;
  const { username } = req.params; // {username:"", id:122344}
  res.render('personal-fridge', {paragraphs, currentUser : req.user})
})

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

//ROUTES controllers

const Auth = require('./controllers/auth.js')(app);
const User = require('./models/user');


server.listen(process.env.PORT || '3000', (err) => {
  console.log("Listening on Port 3000");
});
