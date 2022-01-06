var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score=0

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;

var balloon1;

var obstacle1,obstacle2,obstacle3;
var obstacle1Img,obstacle2Img,obstacle3Img;
var obs1grp,obs2grp,obs3grp;
var obstaclesGroup;

var obstaclesGroup;
var rand;
var life = 1;

function preload() {
    obstacle1Img = loadImage("assets/obstacle1.png");
    obstacle2Img = loadImage("assets/obstacle2.png");
    obstacle3Img = loadImage("assets/obstacle3.png");
}
function setup() {
    createCanvas(500,800);
    engine = Engine.create();
    world = engine.world;

   balloon1 = createSprite(250,700,65,100);

   obs1grp = new Group();
   obs2grp = new Group();
   obs3grp = new Group();
}
function draw() {
    background(10, 128, 202);
    Engine.update(engine);

    fill("white")
    textSize(25);
    text("score:" + score,40,60);

    if(gameState === PLAY){
        
    score=  score+ Math.round(frameCount/300);

    spawnObstacles();
    handleKeyControls();

    if (obs1grp.isTouching(balloon1) || obs2grp.isTouching(balloon1) || obs3grp.isTouching(balloon1)) {
        gameState = END;
    }
 }
    else if (gameState === END) {
    results();
    }

    balloon1.display();

    drawSprites();
}
function handleKeyControls() {
    if (keyDown(37)){
        balloon1.x -= 5;
    }
    if (keyDown(39)) {
        balloon1.x += 5;
    }

}
function spawnObstacles(){
    if (frameCount % 60 === 0){
     // var obstacle = createSprite(Math.round(random(1,500)),200,40,40);
      //obstacle.velocityY = 6;
      
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: obstacle1=createSprite(Math.round(random(1,500)),200,40,40);
                 obstacle1.velocityY = 6;
                 obstacle1.addImage("triangle", obstacle1Img);
                 obstacle1.scale=0.5;
                 obs1grp.add(obstacle1);
                 obstacle1.lifetime = 300;
                 break;
         case 2: obstacle2=createSprite(Math.round(random(1,500)),200,80,40);
                 obstacle2.velocityY = 6;
                 obstacle2.addImage("circle", obstacle2Img);
                 obstacle2.scale=0.3;
                 obs2grp.add(obstacle2);
                 obstacle2.lifetime = 300;
                 break;
         case 3: obstacle3=createSprite(Math.round(random(1,500)),200,10,80);
                 obstacle3.velocityY = 6;
                 obstacle3.addImage("octogon", obstacle3Img);
                 obstacle3.scale=0.7;
                 obs3grp.add(obstacle3);
                 obstacle3.lifetime = 300;
                 break;
         default: break;
       }
      
       
      
       
    }
}
function results(){
    
    console.log("inside results");
    obs1grp.setVelocityYEach(0);
    obs2grp.setVelocityYEach(0);
    obs3grp.setVelocityYEach(0);
    
    obs1grp.setLifetimeEach(-1);
    obs2grp.setLifetimeEach(-1);
    obs3grp.setLifetimeEach(-1);
    
}

/*function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(400,165,10,40);
      obstacle.velocityX = -6;
      
       //generate random obstacles
       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: obstacle.addImage(obstacle1);
                 break;
         case 2: obstacle.addImage(obstacle2);
                 break;
         case 3: obstacle.addImage(obstacle3);
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
}
function results(){
  if (obstaclesGroup.isTouching(balloon1)) {
        console.log("inside results");
        obstaclesGroup.setVelocityXEach(0);
        
        obstaclesGroup.setLifetimeEach(-1);
    }
}*/
