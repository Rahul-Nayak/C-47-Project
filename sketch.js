var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg,blastImg;
var heartImg,heart1Img,heart2Img,heart,heart1,heart2,bulletImg,bulletGroup,bullet,zombiesGroup;
var score;
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg");
  heartImg = loadImage("assets/heart_1.png");
  heart1Img = loadImage("assets/heart_2.png");
  heart2Img = loadImage("assets/heart_3.png");
  bulletImg = loadImage("assets/bullet1.png");
  blastImg = loadImage("assets/blast.png");


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

heart = createSprite(displayWidth-1000,displayHeight-700,50,50);
heart.addImage(heartImg);
heart.scale = 0.3;

heart1 = createSprite(displayWidth-1060,displayHeight-700,50,50);
heart1.addImage(heartImg);
heart1.scale = 0.3;

heart2 = createSprite(displayWidth-1125,displayHeight-700,50,50);
heart2.addImage(heartImg);
heart2.scale = 0.3;

bulletGroup = createGroup();
zombiesGroup = createGroup();
score = 0;

}

function draw() {
  background(0); 
  


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(zombiesGroup.collide(bulletGroup)){
  handleZombieCollision(zombiesGroup);
  score=score+5;
}

 if(keyDown("space")){
      shootBullet();
    }

spawnZombies();

drawSprites();
textSize(30);
fill("white");
text("Score :" + score,1000,50);
fill("white");
textSize(10);
text(mouseX+','+mouseY,mouseX,mouseY);


}

function spawnZombies(){
 
    //write code here to spawn the clouds
    if (frameCount % 60 === 0) {
      zombie = createSprite(1000,10,40,10);
      zombie.y = Math.round(random(500,10));
      zombie.addImage(zombieImg);
      zombie.scale = 0.1;
      zombie.velocityX = -3;
      zombie.lifetime = 300;
      zombiesGroup.add(zombie);
    }
    }

     function shootBullet(){
  bullet= createSprite(307, width/2, 50,20)
  bullet.y= player.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.05;
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleZombieCollision(bulletGroup){
  if (heart > 0) {
     score=score+1;
  }
  if (heart1 > 0) {
    score=score+1;
 } 
  if (heart2 > 0) {
  score=score+1;
}
  var blast= createSprite(bullet.x+100, bullet.y, 50,50);
  blast.addImage(blastImg) 

  /* blast= sprite(bullet.x+60, bullet.y, 50,50);
  blast.addImage(blastImg) */

  /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
  blast.add(blastImg) */

  /* blast= createSprite(bullet.x+60, bullet.y, 50,50);
  image(blastImg) */
  
  blast.scale=0.3
  blast.life=20
  bulletGroup.destroyEach()
  zombiesGroup.destroyEach()
}

