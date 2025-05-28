//Generating a random color
var buttonColors=["red",'blue',"green","yellow"];
var gamePattern = [];
var userClickedPattern =[];
var started = false;
var level = 0;



//Start the game
//Detect keyboard press
$(document).keydown(function(){
  if (!started){
    $("#level-title").text("level "+ level);
    nextSequence();
    started = true;
  }
});


//Creating event listener to detect click
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//check answer
function checkAnswer(currentLevel){
   if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
   
   if(userClickedPattern.length===gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
   }
  }else{
    console.log("wrong");
    var audio = new Audio("./sounds/wrong.mp3" );
  audio.play();
   $("body").addClass("game-over");
   setTimeout(function(){
    $("body").removeClass("game-over");
  },1000);
   startOver();
   }
}

//Start oVer
function startOver(){
  $("h1").text("Game Over, press any key to restart")
  level=0;
  gamePattern=[];
  started = false;
}

function nextSequence(){
userClickedPattern=[];

  level++;
  $("#level-title").text("level "+ level);


    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
//Creating the flash affect 
$('#'+ randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//Adding sound
playSound(randomChosenColor);

}

//Adding sounds to Button Clicks
function playSound(name){
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

//Add animations to User clicks
function animatePress(currentColor){
   $("#"+currentColor).addClass("pressed");
//Adding time delay
setTimeout(function() {
  $("#"+ currentColor).removeClass("pressed") ; }, 100);
   }

