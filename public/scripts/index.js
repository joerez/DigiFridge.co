$(document).ready(() => {

    var socket = io.connect('');

    $( function() {
      $( "#sortable" ).sortable();
    } );

    $( function() {
      $( ".draggable" ).draggable({
        // When the user starts dragging, make sure the z-index for this
   // helper is higher than all other draggables.
   start: function ( e, ui ) {
       $( ".ui-draggable" ).not( ui.helper.css( "z-index", "1" ) )
       .css( "z-index", "0" );
     },
   drag: function (e, ui ) { //On Drag
        socket.emit('updateBoxPos', {id : e.target.id, pos : {top : $(this).css('top'), left : $(this).css('left')}});
     },

        scroll: true,
      });
    });

    $("#reveal").on("click", function() {
      $("#come").removeClass('hidden').addClass('animated fadeInDown');
    });

    $( ".parabox").mousedown(function() {
      $(this).addClass('shadowit');
      $(this).addClass('scale');
      socket.emit('mouseDownBox', {id : $(this).attr('id')});
    });

    $( ".parabox").mouseup(function() {
      $(this).removeClass('shadowit');
      $(this).removeClass('scale');
      socket.emit('mouseUpBox', {id : $(this).attr('id')});
    });

    $( ".myDiv").mousedown(function() {
      $(this).addClass('shadowit');
      $(this).addClass('scale');

    });

    $( ".myDiv").mouseup(function() {
      $(this).removeClass('shadowit');
      $(this).removeClass('scale');

    });

  /*  $(document).on('keydown', function(e){
        if(e.which == 68){
          $(".myDiv").addClass('deleteit');
        });
        */

    socket.on('mouseDownBox', (data) => {
      $('#' + data.id).addClass('shadowit scale');
    })

    socket.on('mouseUpBox', (data) => {
      $('#' + data.id).removeClass('shadowit scale');
    })

    socket.on('updateBoxPos', (data) => {
      $('#' + data.id).css('left', data.pos.left);
      $('#' + data.id).css('top', data.pos.top);
    })

})
