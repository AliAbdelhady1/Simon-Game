let buttonColours = ["red", "blue", "green", "yellow"];
let gameMode = [];
let playerMode = [];
let started = false;
let level = 0;

// تشغيل اللعبة بالكيبورد (للكمبيوتر)
$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    gameSequence();
    started = true;
  }
});

// تشغيل اللعبة بزر "Start Game" (للموبايل)
$("#start-btn").click(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    gameSequence();
    started = true;
  }
});

// عند الضغط على أحد الأزرار الملونة
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  playerMode.push(userChosenColour);
  animations(userChosenColour);
  makeSound(userChosenColour);
  playerSequence(playerMode.length - 1);
});

function playerSequence(currentLevel) {
  if (gameMode[currentLevel] === playerMode[currentLevel]) {
    if (playerMode.length === gameMode.length) {
      setTimeout(function () {
        gameSequence();
      }, 1000);
    }
  } else {
    makeSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Start or Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function gameSequence() {
  playerMode = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * buttonColours.length);
  let randomColour = buttonColours[randomNumber];
  gameMode.push(randomColour);
  $("#" + randomColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  makeSound(randomColour);
}

function animations(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}

function makeSound(name) {
  let audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  started = false;
  gameMode = [];
}
