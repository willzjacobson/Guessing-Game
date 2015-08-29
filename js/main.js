// Main JS File for Guessing Game
// Created by Will jacobson 8/28/15. 

$(document).ready(function() {

  function commence() {

    var number = Math.ceil(Math.random() * 100);
    var guess;
    var guessArr = [];
    var count = 5;
    var win = false;
    var decoyHint = Math.ceil(Math.random()*9);
    var end = "";
    changeMessage("");
    $('.number-guesses').text(count);
    $('.progress-bar').width('0%');

    $('.submit-guess').on('click', function() {
      if (win == false && count > 0) {

        guess = +$('.guess').val();
        guessArr.push(guess);

        if (guess === number) {
          win = true;
          changeMessage("You did it! You saved our beautiful planet!");
          $('.jumbotron').css({'background':'url("img/happy-earth.jpg") 0 -150px no-repeat', 'background-size':'cover'});
          $('.jumbotron').find('h1').text("Nice Work!");
          $('.jumbotron').find('h1').css({'color':'white'});
          $('.jumbotron').find('.lead').text("Knew we could count on you.");
          $('.jumbotron').find('.lead').css({'color':'white'});
          win = true;
        } else if (guess === undefined || isNaN(guess) || guess > 100 || guess < 1) {
          changeMessage("Enter a number from 1 to 100, this is no time for foolery!");
        } else {
          count--;
          updateBar();
          if (count === 0 && guess !== number) {
            $('.jumbotron').css({'background-image':'url("img/boom.jpg")'});
            $('.jumbotron').find('h1').text("Aww, Snap.");
            $('.jumbotron').find('h1').css({'text-align':'right'});
            $('.jumbotron').find('.lead').text("Better luck next time.");
            $('.jumbotron').find('.lead').addClass('lost');
            $('.exclame').text("!");
          }

          if (count === 1) {
            end = "This is you're last chance...";
          }

          if (count > 0) {
            if (count < 4 && guessArr[guessArr.length-1] === guessArr[guessArr.length-2]) {
              changeMessage("You just guessed that number! Who the hell put you in charge!? " + end);
            } else if (number - guess >= 30) {
              changeMessage("You are frigid. Higher. Much. Please " + end);
            } else if (number - guess <= -30) {
              changeMessage("You are frigid. Lower. Much. Please " + end);
            } else if (number - guess < 30 && number - guess > 17) {
              changeMessage("Pretty far out. Go higher. " + end);
            } else if (number - guess > -30 && number - guess < -17) {
              changeMessage("Pretty far out. Go lower. " + end);
            } else if (number - guess <= 17 && number - guess > 10) {
              changeMessage("You're kinda close but not really. Guess higher. " + end);
            } else if (number - guess >= -17 && number - guess < -10) {
              changeMessage("You're kinda close but not really. Guess lower. " + end);
            } else if (number - guess <= 10 && number - guess > 5) {
              changeMessage("Getting close. A bit higher. " + end);
            } else if (number - guess >= -10 && number - guess < -5) {
              changeMessage("Getting close. A bit lower. " + end);
            } else if (number - guess <= 5 && number - guess > 0) {
              changeMessage("Super close! Just a bit higher! " + end);
            } else if (number - guess >= -5 && number - guess < 0) {
              changeMessage("Super close! Just a bit lower! " + end);
            } 
          } else {
            changeMessage("Bummer, you blew it. Turn back the clock for another shot.");
          }
        }
      } else if (win == false && count === 0) {
        changeMessage("No more guesses. You're probably dead anyway.");
      } else if (win == true) {
        changeMessage("Um, stop guessing. You've already saved us.")
      }
    });

    $('.hint').on('click', function() {
      if (guess === undefined || isNaN(guess) || guess > 100 || guess < 1) {
        changeMessage("Enter a valid guess and God will give you a valid sign");
      } else if (count === 0) {
        changeMessage("No hints, you already blew it. Turn back the clock for another shot.");
      } else {
        changeMessage("NASA has pinned the last digit down to " + (guess+"")[(guess+"").length-1] + " or " + decoyHint + "!");
      }
    })

    function changeMessage(text) {
      $('#message').text(text);
    }

    function updateBar() {
      $('.number-guesses').text(count);
      var percent = (5-count)*20;
      $('.progress-bar').width(percent+'%');
      if (percent === 40) { $('.progress-bar').css({'background-color': '#674db7'}); }
      if (percent === 60) { $('.progress-bar').css({'background-color': '#b85dc6'}); }
      if (percent === 80) { $('.progress-bar').css({'background-color': '#dd39a4'}); }
      if (percent === 100) { $('.progress-bar').css({'background-color': '#ff0000'}); }
    }
  }

  commence();

  $('.again').on('click', function() {
    commence();
  });
});
