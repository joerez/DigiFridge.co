$(document).ready(() => {

    $( function() {
      $( "#sortable" ).sortable();
    } );

    $("#reveal").on("click", function() {
      $("#come").removeClass('hidden').addClass('animated fadeInDown');
    });

})
