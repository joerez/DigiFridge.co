$(document).ready(() => {

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
   }
      });
    });

    $("#reveal").on("click", function() {
      $("#come").removeClass('hidden').addClass('animated fadeInDown');
    });

})
