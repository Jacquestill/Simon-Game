'use strict';

// Creating array with colors and game pattern
const buttonColors = ['red', 'blue', 'yellow', 'green'];
let gamePattern = [];
let userClickPattern = [];
let started = false;
let level = 0;

// Function to play the sound effects
const playSound = function(name) {

  // Adding the sound effect
  $(`#${name}`).ready(function() {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
  })
}

// Add pressed class to btn element
const animatePress = function(currentColor) {
  // Adding and removing class
  $(`#${currentColor}`).addClass('pressed');
  setTimeout(() => $(`#${currentColor}`).removeClass('pressed'), 100);
}

// Function Generating random color and adding to pattern array
const nextSquence = function(e) {

  // Reset user clicked array
  userClickPattern = [];

  // Updating the H1
  level++;
  $('h1').text(`Level ${level}`);

  // Generate number 0-3
  const randomNumber = Math.floor(Math.random() * 4);

  // Add generated color to pattern array
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);

  // Adding a flash animation
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100);
}

const checkAnswer = function(currentLevel) {
  console.log(currentLevel);

  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {

    // When the user is correct
    console.log('Success');
    console.log(userClickPattern);
    console.log(gamePattern);
    if (gamePattern.length === userClickPattern.length) {
      setTimeout(() => nextSquence(), 1000);
    }
  } else {

    // When the user is not correct
    console.log('Wrong');
    const wrong = new Audio('sounds/wrong.mp3');
    wrong.play();
    $('body').addClass('game-over');
    setTimeout(() => $('body').removeClass('game-over'), 200);
    $('h1').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

// Start the game
$(document).keypress(function(e) {
  if (!started) {
    nextSquence(e);
    $('h1').text(`Level ${level}`);
    started = true;
  }
});

// Button clicked by user
$('.btn').click(function(e) {

  console.log(e.target.id);
  let userChosenColor = e.target.id;
  userClickPattern.push(userChosenColor);

  // Adding sound and animation
  playSound(userChosenColor);
  animatePress(userChosenColor);

  // Adding checkAnswer Function
  checkAnswer(userClickPattern.length - 1);
});

// Restart Game
const startOver = function() {
  level = 0;
  gamePattern = [];
  started = false;
}
