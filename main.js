'use strict'

$(document).ready(init);

var isSelected = false;
var gameInProgress = false;
var numberOfBlocks;


  function init() {
    console.log('hello');

    // start of game - initialize 3 blocks in section1
    // block ids from 3(bottom) 2(middle) 1(top)


    // user clicks on section1, top block selected

    // user clicks on different section, block moves to location

      // rules for moving:
      // larger block cannot be placed on top of smaller block
      // check if block ID number of selected is < location to move
      // or no block present

      // case: user clicks section, no block present or initialize with empty
      // div with 1+ number of blocks

      // case: user clicks section, block present is larger than selected block
      // -- block moves on top of blocks in section


    $('#startButton').click(beginGame);
    $('.section').click(selectionHandler);
    $('#newGameButton').click(resetGame);

  }

  function beginGame(){
    if (gameInProgress){
      return;
    }

    var numberOfBlocks = $('#startNumber').val();

    if (!numberOfBlocks){
      return;
    }

    gameInProgress = true;

    if (numberOfBlocks){

      function randomColor(){
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);

        var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        return color;
      }

      for (var i = numberOfBlocks; i > 0; i--){
        var newBlock = $('<div>').addClass('block')
                                .attr('data-size', i)
                                .css('width', i.toString()+'5px')
                                .css('margin-left', ((5*(numberOfBlocks - i)).toString() + 'px'))
                                .css('background-color', randomColor());
        $('#section1').prepend(newBlock);
      }


    var $blockbottom = $('<div class="block bottom" data-size=' + (parseInt(numberOfBlocks) + 1).toString() + '></div>')
    $blockbottom.clone().appendTo($('#section1'));
    $blockbottom.clone().appendTo($('#section2'));
    $blockbottom.clone().appendTo($('#section3'));



    // var $block3 = $('<div>').addClass('block').attr('data-size', '3').text('3');
    // var $block2 = $('<div>').addClass('block').attr('data-size', '2').text('2');
    // var $block1 = $('<div>').addClass('block').attr('data-size', '1').text('1');
    //
    // $('#section1').prepend($block3)
    //               .prepend($block2)
    //               .prepend($block1);


    }
  }

  function selectionHandler(event){
    event.preventDefault();
    event.stopPropagation();

    var numberOfBlocks = $('.bottom').data('size');
    var $clickedSection = $(event.target).find('div.block:first');
    console.log(numberOfBlocks)
    if (!isSelected) {
      if ($clickedSection.data('size') === numberOfBlocks){
        return;
      }
      $clickedSection.addClass('highlighted');
      isSelected = true;
      console.log(isSelected);
    } else {
      // compare selected section disc with new section disc
      var selectedBoxSize = $('.highlighted').data('size');
      var toMoveBoxSize = $clickedSection.data('size');
      console.log(selectedBoxSize, toMoveBoxSize);
      if (selectedBoxSize === toMoveBoxSize){
        $clickedSection.removeClass('highlighted');
        isSelected = false;
        return;
      }

      if (selectedBoxSize < toMoveBoxSize){

        var $selectedBox = $('.highlighted').detach();
        $clickedSection.parent().prepend($selectedBox);
        $selectedBox.removeClass('highlighted');
        isSelected = false;

      }

      checkForVictory();
    }
  }


  function checkForVictory(){
    var section1Clear = $('#section1').children().length;
    var section2Clear = $('#section2').children().length;

    if (section1Clear === 1 & section2Clear === 1) {
      victoryAnimation();
      $('.section').off();
    }
  }


  function victoryAnimation() {
    console.log('here');
    var $victoryFace = $('<div>').addClass('victoryFace');
    var $blankcover = $('<div>').addClass('blankcover').append('<h1>Awesome sauce!</h1>');
    $('#gameSpace').append($victoryFace);
    $('#gameSpace').append($blankcover);

    $('.victoryFace').animate({'margin-top': '-=300px'}, 5000, 'easeInOutCirc');

    window.setTimeout(function(){
      $('.blankcover').animate({'font-size': '30px'}, 1000, 'easeOutBounce');

    }, 5000);

  }

  function resetGame() {
    location.reload();
  }
