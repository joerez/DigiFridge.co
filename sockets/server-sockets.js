const Paragraph = require('../models/paragraph');
module.exports = (io) => {

  io.on('connection', function (socket) {

    socket.on('loadBoxes', () => {
      Paragraph.find({}, (err, boxes) =>{
        socket.emit('loadBoxes', {boxes : boxes});
      });
    })

    socket.on('newBox', (data) => {
      let paragraph = new Paragraph({text : data.text, pos : data.pos});
      paragraph.save((err, thisP) => {
        io.emit('newBox', {box : thisP});
      })
    })

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

    socket.on('updateBoxPos', (data) => {
      socket.broadcast.emit('updateBoxPos', {id : data.id, pos : data.pos});
    })

  });


}
