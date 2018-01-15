$(document).ready(() => {

    var socket = io.connect('http://localhost:3000');

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
        scroll: true,
      });
    });

    $("#reveal").on("click", function() {
      $("#come").removeClass('hidden').addClass('animated fadeInDown');
    });

    $( ".parabox").mousedown(function() {
      $(this).addClass('shadowit');
      $(this).addClass('scale');
      socket.emit('btnClick', {id : $(this).attr('id')});
    });

    $( ".parabox").mouseup(function() {
      $(this).removeClass('shadowit');
      $(this).removeClass('scale');

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

    socket.on('btnClick', (data) => {
      console.log("Clicked " + data.id);
    })

})
