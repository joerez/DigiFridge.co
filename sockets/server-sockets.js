module.exports = (io) => {

  io.on('connection', function (socket) {

    console.log("New User Connected.");

    socket.on('btnClick', (data) => {
      console.log("Clicked " + data.id);
      socket.broadcast.emit('btnClick', {id : data.id});
    })

  });


}
