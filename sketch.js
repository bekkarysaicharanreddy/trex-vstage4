var cloudImg
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var trex ,trex_running;
var groundImage
var ground
var invisibleGround
var obstaclesGroups,cloudsGroup
var PLAY=1
var END =0 
var gameState=PLAY
function preload(){

  cloudImg=loadImage('cloud.png')
  trex_running=loadAnimation('trex1.png','trex3.png','trex4.png')

  groundImage=loadImage('ground2.png')
  obstacle1=loadImage('obstacle1.png')
  obstacle2=loadImage('obstacle2.png')
  obstacle3=loadImage('obstacle3.png')
  obstacle4=loadImage('obstacle4.png')
  obstacle5=loadImage('obstacle5.png')
  obstacle6=loadImage('obstacle6.png')

}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
  trex=createSprite(50,160,20,50)
  trex.addAnimation('running',trex_running)
  trex.scale=0.5
  edges=createEdgeSprites()
  ground=createSprite(200,180,400,20)
  ground.addImage(groundImage)
  ground.x=ground.width/2
  ground.velocityX=-4
  invisibleGround=createSprite(200,190,400,10)
  invisibleGround.visible=false
  obstaclesGroup=new Group()
  cloudsGroup=new Group()
}

function draw(){
  background("white")
  if(gameState===PLAY)
  {
    
    if(keyDown('space')&&trex.y>160){
      trex.velocityY=-10
    }
    ground.velocityX=-4
    trex.velocityY=trex.velocityY+0.5
    if(ground.x<0){
      ground.x=ground.width/2
    }
    spawnClouds()
    spawnObstacles()
    if(obstaclesGroup.isTouching(trex))
    {
      gameState=END
    }
  }

  else if(gameState===END)
  {
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
   ground.velocityX=0 
  }
  
 
  trex.collide(invisibleGround)
  
  drawSprites()
  console.log(frameCount)
  

}
function spawnClouds(){
  if(frameCount%60===0){
  var cloud=createSprite(600,100,40,10)
  cloud.y=Math.round(random(10,60))
  cloud.velocityX=-3
  cloud.addImage(cloudImg)
  cloud.scale=0.4
  cloud.depth=trex.depth 
  trex.depth=trex.depth+1
  cloud.lifetime=200
  cloudsGroup.add(cloud)

  }
}
function spawnObstacles(){
  if(frameCount%60===0){
   var obstacle=createSprite(600,165,10,40)
   obstacle.velocityX=-6
   var rand=Math.round(random(1,6))
   switch(rand){
     case 1 :obstacle.addImage(obstacle1);break;
     case 2 :obstacle.addImage(obstacle2);break;
     case 3 :obstacle.addImage(obstacle3);break;
     case 4 :obstacle.addImage(obstacle4);break;
     case 5 :obstacle.addImage(obstacle5);break;
     case 6 :obstacle.addImage(obstacle6);break;
     default:break


   }
   obstacle.lifetime=100
   obstacle.scale=0.5
   obstaclesGroup.add(obstacle)
  }
}

