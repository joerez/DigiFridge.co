let Paragraph = require('../models/paragraph');


module.exports = (app) => {

  //Personal fridge
  app.get('/fridges/:username', (req, res) =>  {

    const { username } = req.params;
    currentUser = req.User;

    Paragraph.find({}, (err, paragraphs) =>{
      res.render('personal-fridge', {paragraphs : paragraphs, currentUser : req.user});
    })
  });


  /*app.get('/fridges/:username', (req, res) => {
    //const username = req.params.username;
    const { username } = req.params; // {username:"", id:122344}
    res.render('personal-fridge', {paragraphs, currentUser : req.user})
  })
  */

}
