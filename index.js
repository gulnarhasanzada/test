
var buttons =['green','red','blue','yellow'];
var gameClicks=[];
var playerClicks=[];
var count=0;
var level=1;

//start game with ramdom click by game
$(document).keypress(function(event){
  randomClick();
  //update level-title
  $('#level-title').text('Level '+level);
});

//on every user click
$('.btn').click(function(event){
  //get id of clicked button
  var id = $(event.target).attr('id');

  //add id to playerClicks array
  playerClicks.push(id);


  check(id);
});



//func check if clicked button is correct
//if yes - whether it is final or not
function check(id){
  //check if correct button
  if(playerClicks[count]==gameClicks[count])
  {
    clickButton(id);
    //check if last button
    if(count==(gameClicks.length-1))
    {
      //start new level
      setTimeout(function(){
      randomClick();
       $('#level-title').text('Level '+level);
      },1000);
      playerClicks=[];
      count=0;
      level++;
    }
    else
    {
      count++;
    }
  }
  else
  {
    gameOver();
  }
}

//func to end game
function gameOver(){
  playSound("wrong");
  gameClicks=[];
  playerClicks=[];
  count=0;
  level=1;
  $('#level-title').text('Game over, Press any key to start');
  $('body').addClass('game-over');
  setTimeout(function(){
    $('body').removeClass('game-over');
  },100);
}

//func to click random button
function randomClick(){
  var number = Math.floor(Math.random()*4);
  clickButton(buttons[number]);
  gameClicks.push(buttons[number]);
}

//func make sound on button click
function playSound(idName){
    var soundUrl ="sounds/"+idName+".mp3";
    var sound = new Audio(soundUrl);
    sound.play();

  }

//animate button on click and make sound
function clickButton(idName){

    $('#'+idName).addClass('pressed');
    setTimeout(function(){
     $('#'+idName).removeClass("pressed");
    },100);
   playSound(idName);
  }
