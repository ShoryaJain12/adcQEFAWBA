var trex, trex_running,trex_stop, edges;
var gameState="PLAY";
var groundImage, ground;

var invisGround;

var r;

var cloud;
var cloudImage;

var cactus;
var cactus1;
var cactus2;
var cactus3;
var cactus4;
var cactus5;
var cactus6;

var score = 0;

var obstaclesGroup,cloudsGroup;

var restart,restartImage;
var gameOver,gameOverImage;

var jumpSound;
var dieSound;
var checkSound;


function preload(){
 trex_running=loadAnimation("papanb1.png", "papanb2.png", "papanb3.png")
 trex_stop=loadAnimation("papanb1.png")

 groundImage=loadImage("ground2.png")
 cloudImage=loadImage('cloud (1).png')

 cactus1=loadImage('obstacle1.png')
 cactus2=loadImage('obstacle2.png')
 cactus3=loadImage('obstacle3.png')
 cactus4=loadImage('obstacle4.png')
 cactus5=loadImage('obstacle5.png')
 cactus6=loadImage('obstacle6.png')

 restartImage=loadImage('restart.png')
 gameOverImage=loadImage('gameOver.png')

 jumpSound=loadSound('jump.mp3')
 dieSound=loadSound('die.mp3')
 checkSound=loadSound('checkpoint.mp3')
}

function setup(){
  createCanvas(600,200);
  
  // creating trex
  trex=createSprite(50,150,10,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("stop",trex_stop)
  trex.changeAnimation("running")
  //adding scale and position to trex
  trex.scale=0.05;

  ground=createSprite(300,160,600,30);
  ground.addImage("ground", groundImage)
  ground.velocityX=-5;

  invisGround = createSprite(300,170,600,10);
  invisGround.visible = false;
 
  r=Math.round(random(10,100));
  console.log(r);

  obstaclesGroup=new Group();
  cloudsGroup=new Group(); 

  restart=createSprite(300,100,100,100);
  gameOver=createSprite(300,75,25,25);
  restart.addImage("restart",restartImage)
  gameOver.addImage("gameOver",gameOverImage)
  restart.scale=0.5;
  gameOver.scale=3;

  trex.setCollider("rectangle",0,0,800,trex.height)
  trex.debug=2;
  console.log("MESSAGE", getFrameRate())
  
 
}


function draw(){
  //set background color 
  background("white");
  textSize(20);
  textFont("Roboto Mono");
  text("Score: "+score,500,20);
  
  if(gameState=="PLAY"){
    
    if(ground.x<0) {
      ground.x=ground.width/2;
    }

    if(keyDown("space") && trex.y>140) {
      trex.velocityY=-15;
      jumpSound.play()
    }

    ground.velocityX=-(5+3*score/100);
    score=score+Math.round(frameCount/80);
    trex.velocityY=trex.velocityY+0.5
    if(score>0 && score%100==0) {
      checkSound.play()
    }

    spawnClouds();

    spawnCactai(); 

    if(obstaclesGroup.isTouching(trex)) {
      gameState="END";
      dieSound.play()
     //trex.velocityY=-12;
     //jumpSound.play;
  }
    gameOver.visible=false;
    restart.visible=false;
}
  else if(gameState=="END"){
    ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

    trex.changeAnimation("stop")

    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1)   ; 
    gameOver.visible=true;
    restart.visible=true;

    if(mousePressedOver(restart)) {
      reset()
      console.log("reset")
    }
  
  }
 
  //logging the y position of the trex
  
  //text(trex.y,);
  
  //jump when space key is pressed
  
  


  trex.velocityY=trex.velocityY+0.5
  //stop trex from falling down
  trex.collide(invisGround);

 
  drawSprites();
 
}
function spawnClouds() {
  if(frameCount%60==0) {
    cloud=createSprite(600,r,10,10);
    cloud.velocityX=-5;
    cloud.addImage(cloudImage);
    cloud.lifetime=130;
    trex.depth=cloud.depth+1;
    cloudsGroup.add(cloud);
  }
}
function reset() {
  gameState="PLAY";
  obstaclesGroup.destroyEach() 
  cloudsGroup.destroyEach() 
  trex.changeAnimation("running",trex_running)
  frameCount=0;
  score=0;
}

function spawnCactai() {
  if(frameCount%60==0) {
    cactus=createSprite(600,150,10,10);
    cactus.velocityX=-(4+score/100);
    cactus.scale=0.5;
    cactus.lifetime=200;
    var rand=Math.round(random(1,6));
    switch(rand) {
      case 1: cactus.addImage(cactus1);
          break;
      case 2: cactus.addImage(cactus2);
          break;
      case 3: cactus.addImage(cactus3);
          break;
      case 4: cactus.addImage(cactus4);
          break;
      case 5: cactus.addImage(cactus5);
          break;
      case 6: cactus.addImage(cactus6);
          break;
      default: break;
    }
    obstaclesGroup.add(cactus);
   
  }

}