const Paragraph = require('../models/paragraph');
const Trash = require('../models/trash');

module.exports = (io) => {

  io.on('connection', function (socket) {

/********************************
        LOAD THINGS UP
*********************************/

  function loadIt(model) {
    socket.on('loadBoxes', () => {
      model.find({}, (err, boxes) =>{
        socket.emit('loadBoxes', {boxes : boxes});
      });
    })
  }

    socket.on('loadBoxes', () => {
      Paragraph.find({}, (err, boxes) =>{
        socket.emit('loadBoxes', {boxes : boxes});
      });
    })

    loadIt(Trash);

/*************************************
              POSITION UPDATER
*************************************/

function updatePosition() {
  socket.on('updateBoxPos', (data) => {
    socket.broadcast.emit('updateBoxPos', {id : data.id, pos : data.pos});
  })
}

socket.on('updateBoxPos', (data) => {
  socket.broadcast.emit('updateBoxPos', {id : data.id, pos : data.pos});
})

updatePosition(Trash);

/*************************************
              NEW BOX
*************************************/

    function createNew(model) {
      socket.on('newBox', (data) => {
        let paragraph = new model({text : data.text, pos : data.pos});
        paragraph.save((err, thisP) => {
          io.emit('newBox', {box : thisP});
        })
      })
    }


    socket.on('newBox', (data) => {
      let paragraph = new Paragraph({text : data.text, pos : data.pos});
      paragraph.save((err, thisP) => {
        io.emit('newBox', {box : thisP});
      })
    })

/*************************************
    SERVER SIDED DRAGGING EFFECTS
*************************************/

  function prettyDrag(model) {
    socket.on('mouseDownBox', (data) => {
      socket.broadcast.emit('mouseDownBox', {id : data.id});
    })

    socket.on('mouseUpBox', (data) => {
      socket.broadcast.emit('mouseUpBox', {id : data.id});
      model.findById(data.id, (err, paragraph) => {
        paragraph.pos = data.pos;
        paragraph.save();
      })
    })
  }

    socket.on('mouseDownBox', (data) => {
      socket.broadcast.emit('mouseDownBox', {id : data.id});
    })

    socket.on('mouseUpBox', (data) => {
      socket.broadcast.emit('mouseUpBox', {id : data.id});
      Paragraph.findById(data.id, (err, paragraph) => {
        paragraph.pos = data.pos;
        paragraph.save();
      })
    })



/****************************/


  }); //io.on


} //Module.exports
