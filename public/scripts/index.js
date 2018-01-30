$(document).ready(() => {

    var socket = io.connect('');

    socket.emit('loadBoxes');
    socket.on('loadBoxes', (data) => {
      data.boxes.forEach((box) => {
        let newBox = $('.parabox.draggable.prototype').clone(true);
        newBox.children('.paratext').text(box.text);
        newBox.removeClass('prototype');
        newBox.attr('id', box._id);
        newBox.appendTo('.fridge');
        console.log(box);
        newBox.css('left', box.pos.left);
        newBox.css('top', box.pos.top);
        makeDrag(newBox);
      })
    })

    //Clear the word adding form after hitting submit
    //to prevent spamming the same word super fast.
    $('#subButton').on("click", function() {
      $('#inputone').val(" ");
    })





    /***Jquery UI things ***/

    $( function() {
      $( "#resizable" ).resizable();
    } );



    $( function() {
      $( "#sortable" ).sortable();
    } );

    //This is the trash function. Drag items into the trash to delete them.
    $( function() {
      $( ".droppable" ).droppable({
        drop: function( event, ui ) {
        $( ui.draggable ).addClass( "prototype" );
        $( ui.draggable ).submit(function() {
          $( ui.draggable ).document.location.href = '/' + ui.draggable._id + '?_method=DELETE';
        })
      }
      });
    } );

    /*** END of Jquery UI things ***/


    //Make something draggable function
    function makeDrag(box){
      $( function() {
        $(box).draggable({
          // When the user starts dragging, make sure the z-index for this
          // helper is higher than all other draggables.
          start: function ( e, ui ) {
            $( ".ui-draggable" ).not( ui.helper.css( "z-index", "1" ) )
              .css( "z-index", "0" );
            },
          drag: function (e, ui ) { //On Drag
            socket.emit('updateBoxPos', {id : e.target.id, pos : {top : $(this).css('top'), left : $(this).css('left')}});
          },
            scroll: false, //Allows scrolling out of page if true.
          });
        });
      }
      //End make something draggable function


    //Making different things draggable
    let wordAdderBox = $(".wordAdder.draggable");
    let wordDeleter = $(".trash.draggable.droppable");

    makeDrag(".iffy");

    makeDrag(wordAdderBox);

    makeDrag(wordDeleter);
    //End make things draggable


    $( ".parabox").mousedown(function() {
      socket.emit('mouseDownBox', {id : $(this).attr('id')});
    });

    $( ".parabox").mouseup(function() {
      socket.emit('mouseUpBox', {id : $(this).attr('id'),
                                 pos : {
                                        top : $(this).css('top'),
                                        left : $(this).css('left')
                                       }
                                 });
    });


  


    //This function makes Selectors pretty when moving.
    function scaleIt(box) {

      $(box).mousedown(function() {
        $(this).addClass('shadowit');
        $(this).addClass('scale');

      });

      $(box).mouseup(function() {
        $(this).removeClass('shadowit');
        $(this).removeClass('scale');

      });
    }

    /** -------Things that Scale -----------*/

    scaleIt("#wordaddbox");

    scaleIt(".parabox");



    /*Trash can scaling on drag
    Seperate because we don't want box shadow on it.*/
    $("#trashcan").mousedown(function() {
      $(this).addClass('scale');
    });

    $("#trashcan").mouseup(function() {
      $(this).removeClass('scale');
    });

    //end things that scale


    //Prevent lineIt form from refreshing page
    $(".lineIt").on("submit", function (e) {
      e.preventDefault();
      let pText = $('#inputone').val();
      console.log(pText);
      let newBox = $('.parabox.draggable.prototype').clone(true);
      socket.emit('newBox', {text : pText, pos : {left : newBox.css('left'), top : newBox.css('top')}})
    });


    socket.on('newBox', (data) => {
      let newBox = $('.parabox.draggable.prototype').clone(true);
      newBox.children('.paratext').text(data.box.text);
      newBox.removeClass('prototype');
      newBox.attr('id', data.box._id);
      newBox.appendTo('.section2');
      makeDrag(newBox);
    })

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



    /*****NavBar Buttons ******************************/

    //Word Adder toggler
    $("#addWordBtn").on("click", function() {
      $(".wordAdder").toggleClass("prototype");
    })

    //Trash can toggler
    $("#delWordBtn").on("click", function() {
      $("#trashcan").toggleClass("prototype");
    })


})
