module.exports = (io) => {

  io.on('connection', function (socket) {

    console.log("New User Connected.");

    socket.on('mouseDownBox', (data) => {
      socket.broadcast.emit('mouseDownBox', {id : data.id});
    })

    socket.on('mouseUpBox', (data) => {
      socket.broadcast.emit('mouseUpBox', {id : data.id});
    })

    socket.on('updateBoxPos', (data) => {
      socket.broadcast.emit('updateBoxPos', {id : data.id, pos : data.pos});
    })

  });


}
