let buttoncolour = ["red", "blue", "green", "yellow"];
let gameMode = [];
let playerMode = [];
let strated = false;
let level = 0;



$(document).keydown(function(){
    if(!strated){
        $("#level-title").text("Level " + level);
        gameSequence();
        strated = true ;
    }
});



$(".btn").click (function(){
    let randomUserColour = $(this).attr("id");
    $("#" + randomUserColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playerMode.push(randomUserColour);
    animations(randomUserColour);
    makeSound(randomUserColour);
    playerSequence(playerMode.length-1);
});




function playerSequence(currentLevel){
        if(gameMode[currentLevel] === playerMode[currentLevel]){
            if(playerMode.length === gameMode.length){
                setTimeout(function(){
                    gameSequence();
                },1000);
            }
            
        }
        else{
            makeSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over press any key to restart");
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);
            startOver();
        }
    }


    
    
    function gameSequence(){
        playerMode = [];
        level++;
        $("#level-title").text("Level " + level)
        let randomNumber = Math.floor(Math.random()*$(".btn").length);
        let randomColour = buttoncolour[randomNumber];
        gameMode.push(randomColour);
        $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
        makeSound(randomColour);
    }
    
    function animations(currentColour){
        $("#" + currentColour).addClass(".pressed");
        setTimeout(function(){
            $("#" + currentColour).removeClass("pressed")}, 200);
    }
        
        
    function makeSound(name){
            let audio = new Audio("./sounds/" + name + ".mp3");
            audio.play();
    }
    

    function startOver(){
        level = 0;
        started = false;
        gameMode = [];
    }






