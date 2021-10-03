var canvas;
var blueball, redball, yellowball, runner, back, beach, ballsGroup, gameState = "play";
var beach;
var score = 0;
function preload(){
  blueballImg = loadImage("blueball.png");
  redballImg = loadImage("redball.png");
  yellowballImg = loadImage("yellowball.png");
  runnerImg = loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png","run6.png","run7.png","run8.png","run9.png","run10.png","run11.png","run12.png","run13.png","run14.png","run15.png","run16.png","run17.png");
  beachImg = loadImage("Beach.gif");
}

function setup(){

  canvas = createCanvas(displayWidth - 100, displayHeight-200);

  beach = createSprite(displayWidth-700, displayHeight - 400, 10, 10);
  beach.addImage("beach",beachImg);
  beach.scale = 4;
  beach.velocityX = (6 + 3*score/100);

  run = createSprite(displayWidth - 200, displayHeight - 300,20,50);
 
  run.addAnimation("run", runnerImg); 
  run.scale = 2;

  ground = createSprite(displayWidth - 150, displayHeight-180, 100, 20);

  ballsGroup = new Group();

}

function draw(){

if(gameState === "play"){
  background("white");
  
  fill("black");
  textSize(20);
  text("Score: "+ score, displayWidth - 300, displayHeight - 600);
  score = score + Math.round(getFrameRate()/60);
  spawnBalls();

  if(beach.x > displayWidth-450){
    
    beach.x = displayWidth - 700;
    
  }
  
  if(keyDown("space")){
    run.velocityY = -25;
  }
  
  run.collide(ground);
  
  run.velocityY = run.velocityY + 0.8
  
  if(run.isTouching(ballsGroup)){
    gameState = "end";
  }
  
  drawSprites();
}else if(gameState === "end"){
  background(0);
  textSize(50);
  fill("white");
  stroke("red");
  strokeWeight(10);
  text("Game Over!", 500,250);
}

}

function spawnBalls(){
  if(frameCount % 200 === 0){
    var obstacle = createSprite(displayWidth-1300, 300);
    obstacle.y = Math.round(random(300,400))
    obstacle.velocityX = 3;

    var rand = Math.round(random(1,3));
    switch(rand){
      case 1: obstacle.addImage(blueballImg);
      break;
      case 2: obstacle.addImage(yellowballImg);
      break;
      case 3: obstacle.addImage(redballImg);
      break;
    }
    obstacle.scale = .1;
    obstacle.lifetime = 1500;
    ballsGroup.add(obstacle);
    
  }
}
